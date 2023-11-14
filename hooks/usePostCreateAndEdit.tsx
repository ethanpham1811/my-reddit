import { client } from '@/apollo-client'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { OPTIMISTIC_TEMP_ID, QUERY_LIMIT } from '@/constants/enums'
import { TCardCreatePostForm, TPost, TStorageError, TSubreddit } from '@/constants/types'
import { UPDATE_POST_FRAG } from '@/graphql/fragments'
import { ADD_POST, UPDATE_POST } from '@/graphql/mutations'
import {
  GET_PAGINATED_POST_LIST,
  GET_POST_BY_ID,
  GET_SUBREDDIT_BY_NAME_WITH_POSTS,
  GET_SUBREDDIT_LIST_SHORT,
  GET_USER_BY_USERNAME_WITH_POSTS
} from '@/graphql/queries'
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
    query: { subreddit: subName, username, postid }
  } = useRouter()

  /**
   * Create new post:
   * - if there is upload images => show loading during uploading
   * - otherwise => show new created post immediately without loading (optimistic update)
   *
   * Optimistic update
   * Cache update
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
        // default: home page
        let query: DocumentNode = GET_PAGINATED_POST_LIST
        let variables: { offset: number; limit: number; name?: string; username?: string } = { offset: 0, limit: QUERY_LIMIT }
        let dataKey: string = 'postPaginatedList'
        let childKey: string | null = null

        // subreddit page
        if (subName) {
          // retrieve subreddit name by id from subreddit list
          const sub_name = subreddit?.name
          if (!sub_name) return // abort cache update

          variables = { ...variables, name: sub_name }
          query = GET_SUBREDDIT_BY_NAME_WITH_POSTS
          dataKey = 'subredditByNameWithPosts'
          childKey = 'post'
        }

        // user profile page
        if (username && me) {
          variables = { ...variables, username: me.username }
          query = GET_USER_BY_USERNAME_WITH_POSTS
          dataKey = 'userByUsernameWithPosts'
          childKey = 'post'
        }

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
      }
    })
    errors && toast.error(errors[0].message)
    toast.success('Successfully created post')
  }

  /* update post function */
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
      // optimisticResponse: {
      //   updatePost: {
      //     ...curPost,
      //     ...formData,
      //     images: uploadedFilePaths
      //   }
      // },
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
