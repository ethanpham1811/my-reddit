import { client } from '@/apollo-client'
import { useAppSession } from '@/src/Layouts/MainLayout'
import { OPTIMISTIC_TEMP_ID, QUERY_LIMIT } from '@/src/constants/enums'
import { TCardCreatePostForm, TPost, TStorageError, TSubreddit } from '@/src/constants/types'
import { UPDATE_POST_FRAG } from '@/src/graphql/fragments'
import { ADD_POST, UPDATE_POST } from '@/src/graphql/mutations'
import {
  GET_PAGINATED_POST_LIST,
  GET_POST_BY_ID,
  GET_SUBREDDIT_BY_NAME_WITH_POSTS,
  GET_SUBREDDIT_LIST_SHORT,
  GET_USER_BY_USERNAME_WITH_POSTS
} from '@/src/graphql/queries'
import { ApolloCache, DocumentNode, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSupabaseUpload from './useSupabaseUpload'

function usePostCreateAndEdit() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [loading, setLoading] = useState(false)
  const [uploadImgError, setUploadImgError] = useState<string | null>(null)
  const uploadFiles = useSupabaseUpload()
  const { data: subList } = useQuery(GET_SUBREDDIT_LIST_SHORT)
  const [insertPost] = useMutation(ADD_POST)
  const [editPost] = useMutation(UPDATE_POST)
  const {
    push: navigate,
    query: { subreddit: subName, postid }
  } = useRouter()

  /**
   * Create new post:
   * - if there is upload images => show loading during uploading
   * - otherwise => show new created post immediately without loading (optimistic update)
   *
   * Optimistic update
   * Cache update (3 queries: Homepage, Subpage, Userpage)
   */
  const createPost = async (formData: TCardCreatePostForm, resetAndCloseForm: () => void, isLinkPost: boolean) => {
    if (!me) return

    const { subreddit_id, images, title, body, link, linkDescription } = formData
    const { uploadedFilePaths, error: uploadError } = await handleUploadImages(isLinkPost, images)

    // stop loading upon finishing uploading images
    setLoading(false)

    // if uploaded img return null (failed) => return
    if (uploadError) return setUploadImgError(uploadErrorMsg(uploadError))

    // turn of loading & close the form at this point and show optimistic update
    resetAndCloseForm()

    // find the subreddit info by the subreddit_id (formData) to retrieve it's name & subType
    const subreddit: TSubreddit | undefined = (subList as { subredditList: TSubreddit[] })?.subredditList?.find((sub) => sub.id === subreddit_id)

    const { errors } = await insertPost({
      variables: {
        ...formData,
        images: uploadedFilePaths,
        user_id: me?.id
      },
      optimisticResponse: {
        insertPost: {
          id: OPTIMISTIC_TEMP_ID,
          title: title || '',
          body: body || null,
          link: link || null,
          linkDescription: linkDescription || null,
          images: uploadedFilePaths,
          created_at: new Date().toISOString(),
          user: {
            username: me?.username || 'unknown',
            __typename: 'User'
          },
          subreddit: {
            name: subreddit?.name || '',
            id: subreddit?.id || '',
            subType: subreddit?.subType || '',
            __typename: 'Subreddit'
          },
          vote: [],
          comment: [],
          totalUpvotes: 0,
          totalComments: 0,
          __typename: 'Post'
        }
      },
      update: (cache: ApolloCache<any>, { data: { insertPost } }) => {
        const tobeUpdatedQueries: {
          query: DocumentNode
          variables: { offset: number; limit: number; name?: string; username?: string }
          dataKey: string
          childKey: string | null
        }[] = [
          {
            // home page
            query: GET_PAGINATED_POST_LIST,
            variables: { offset: 0, limit: QUERY_LIMIT },
            dataKey: 'postPaginatedList',
            childKey: null
          },

          {
            // subreddit page
            query: GET_SUBREDDIT_BY_NAME_WITH_POSTS,
            variables: { offset: 0, limit: QUERY_LIMIT, name: subreddit?.name },
            dataKey: 'subredditByNameWithPosts',
            childKey: 'post'
          },
          {
            // user profile page
            query: GET_USER_BY_USERNAME_WITH_POSTS,
            variables: { offset: 0, limit: QUERY_LIMIT, username: me?.username },
            dataKey: 'userByUsernameWithPosts',
            childKey: 'post'
          }
        ]

        /* update 3 above queries */
        tobeUpdatedQueries.map(({ query, variables, dataKey, childKey }) => {
          cache.updateQuery({ query, variables }, (data) => {
            if (!data) return // abort cache update
            const cachedPostList: TPost[] = childKey ? data[dataKey][childKey] : data[dataKey]

            return childKey
              ? {
                  [dataKey]: {
                    ...data[dataKey],
                    [childKey as string]: [insertPost, ...cachedPostList]
                  }
                }
              : {
                  [dataKey]: [insertPost, ...cachedPostList]
                }
          })
        })
      }
    })
    errors && toast.error(errors[0].message)
    toast.success('Successfully created post')
  }

  /* ---------------------------------------------------------UPDATE POST ----------------------------------------------- */

  const updatePost = async (formData: TCardCreatePostForm, isLinkPost: boolean) => {
    if (!me) return

    const { post: curPost } = await client.readQuery({
      query: GET_POST_BY_ID,
      variables: { id: postid }
    })

    const { uploadedFilePaths, error: uploadError } = await handleUploadImages(isLinkPost, formData?.images)

    // if uploaded img return null (failed) => stop loading and return
    if (uploadError) {
      setLoading(false)
      return setUploadImgError(uploadErrorMsg(uploadError))
    }

    // turn of loading & close the form at this point and show optimistic update
    navigate(`/r/${subName}/post/${postid}`)

    const payload: Omit<TCardCreatePostForm, 'subreddit_id'> & { subreddit_id?: number } = {
      ...formData
    }
    if (payload['subreddit_id']) delete payload['subreddit_id']

    const { errors } = await editPost({
      variables: {
        ...formData,
        images: uploadedFilePaths,
        user_id: me?.id
      },
      optimisticResponse: {
        updatePost: {
          ...curPost,
          ...formData,
          images: uploadedFilePaths
        }
      },
      update: (cache: ApolloCache<any>, { data: { updatePost } }) => {
        const postCachedId = `Post:${postid}`

        cache.updateFragment({ id: postCachedId, fragment: UPDATE_POST_FRAG }, (_) => {
          return {
            ...updatePost
          }
        })
      }
    })
    errors && toast.error(errors[0].message)
    toast.success('Successfully updated post')
  }

  /* upload images to supabase storage & return array of urls */
  async function handleUploadImages(
    isLinkPost: boolean,
    images: FileList | undefined
  ): Promise<{ uploadedFilePaths: string[] | null; error?: TStorageError }> {
    if (!images || images.length <= 0 || isLinkPost) return { uploadedFilePaths: null }

    // turn on loading state for image upload only
    setLoading(true)

    return await uploadFiles(images)
  }

  /* ------------------------------------------------------ functions -------------------------------------------- */

  function uploadErrorMsg(uploadError: TStorageError): string {
    switch (uploadError?.statusCode) {
      case '413':
        return 'Maxium file size: 5mb'
      default:
        return uploadError?.message
    }
  }

  return { updatePost, createPost, loading, uploadImgError, setUploadImgError }
}

export default usePostCreateAndEdit
