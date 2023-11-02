import { client } from '@/apollo-client'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { OPTIMISTIC_TEMP_ID, QUERY_LIMIT } from '@/constants/enums'
import { TCardCreatePostForm, TPost, TSubreddit } from '@/constants/types'
import { ADD_POST, UPDATE_POST, UPDATE_POST_FRAG } from '@/graphql/mutations'
import {
  GET_PAGINATED_POST_LIST,
  GET_POST_BY_ID,
  GET_SUBREDDIT_BY_NAME_WITH_POSTS,
  GET_SUBREDDIT_LIST_SHORT,
  GET_USER_BY_USERNAME_WITH_POSTS
} from '@/graphql/queries'
import { ApolloCache, DocumentNode, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import useSupabaseUpload from './useSupabaseUpload'

function usePostCreateAndEdit() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [loading, setLoading] = useState(false)
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

    // turn on loading state for image upload only
    formData.images && setLoading(true)

    const { subreddit_id, images, title, body, link, linkDescription } = formData
    const uploadImgUrls: string[] | null = await handleUploadImages(isLinkPost, images, setLoading)

    // turn of loading & close the form at this point and show optimistic update
    setLoading(false)
    resetAndCloseForm()

    // find the subreddit info by the subreddit_id (formData) to retrieve it's name & subType
    const subreddit: TSubreddit | undefined = (subList as { subredditList: TSubreddit[] })?.subredditList?.find((sub) => sub.id === subreddit_id)

    const { errors } = await insertPost({
      variables: {
        ...formData,
        images: uploadImgUrls,
        user_id: me?.id
      },
      optimisticResponse: {
        insertPost: {
          id: OPTIMISTIC_TEMP_ID,
          title: title,
          body: body || null,
          link: link || null,
          linkDescription: linkDescription || null,
          images: uploadImgUrls,
          created_at: new Date().toISOString(),
          user: {
            username: me?.username || 'unknown',
            __typename: 'User'
          },
          subreddit: {
            id: subreddit?.id || '',
            name: subreddit?.name || '',
            subType: subreddit?.subType || '',
            __typename: 'Subreddit'
          },
          vote: [],
          comment: [],
          totalUpvotes: null,
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

    // turn on loading state for image upload only
    formData.images && setLoading(true)

    const { post: curPost } = await client.readQuery({
      query: GET_POST_BY_ID,
      variables: { id: postid }
    })

    const uploadImgUrls: string[] | null = await handleUploadImages(isLinkPost, formData.images, setLoading)

    // turn of loading & close the form at this point and show optimistic update
    navigate(`/r/${subName}/post/${postid}`)

    const { errors } = await editPost({
      variables: {
        ...formData,
        images: uploadImgUrls,
        user_id: me?.id
      },
      optimisticResponse: {
        updatePost: {
          ...curPost,
          ...formData,
          images: uploadImgUrls
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
    images: FileList | undefined,
    cb: Dispatch<SetStateAction<boolean>>
  ): Promise<string[] | null> {
    let uploadedUrls: string[] | null = null

    if (!isLinkPost && images && images.length > 0) {
      uploadedUrls = await uploadFiles(images)
      if (!images) {
        cb(true)
        return null
      }
    }
    return uploadedUrls
  }

  return { updatePost, createPost, loading }
}

export default usePostCreateAndEdit
