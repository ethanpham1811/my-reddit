import { useAppSession } from '@/components/Layouts/MainLayout'
import { TCardCreatePostForm, TPost, TSubreddit } from '@/constants/types'
import { ADD_POST, UPDATE_POST } from '@/graphql/mutations'
import { GET_POST_LIST, GET_SUBREDDIT_BY_NAME, GET_SUBREDDIT_LIST_SHORT, GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloCache, DocumentNode, useMutation, useQuery } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import useSupabaseUpload from './useSupabaseUpload'

function usePostCreateAndEdit() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [loading, setLoading] = useState(false)
  const [uploadFiles] = useSupabaseUpload()
  const { data: subList } = useQuery(GET_SUBREDDIT_LIST_SHORT)
  const [insertPost] = useMutation(ADD_POST)
  const [editPost] = useMutation(UPDATE_POST)
  const {
    query: { subreddit: subName, username }
  } = useRouter()

  /* create or update post function */
  const createPost = async (formData: TCardCreatePostForm, cb: () => void, isLinkPost: boolean) => {
    if (!me) return
    setLoading(true)

    const { body, subreddit_id, title, link, linkDescription, images } = formData
    const uploadImgUrls = await handleUploadImages(isLinkPost, images, setLoading)

    // find the subreddit info by the subreddit_id (formData) to retrieve it's name & subType
    const subreddit: TSubreddit | undefined = (subList as { subredditList: TSubreddit[] })?.subredditList?.find((sub) => sub.id === subreddit_id)

    const { errors } = await insertPost({
      variables: {
        ...formData,
        images: uploadImgUrls,
        user_id: me?.id
      },
      update: (cache: ApolloCache<any>, { data: { insertPost } }) => {
        // default: home page
        let query: DocumentNode = GET_POST_LIST
        let variables: {} = {}
        let dataKey: string = 'postList'
        let childKey: string | null = null

        // subreddit page
        if (subName) {
          // retrieve subreddit name by id from subreddit list
          const sub_name = subreddit?.name
          if (!sub_name) return // abort cache update

          variables = { name: sub_name }
          query = GET_SUBREDDIT_BY_NAME
          dataKey = 'subredditByName'
          childKey = 'post'
        }
        // user profile page
        if (username && me) {
          variables = { username: me.username }
          query = GET_USER_BY_USERNAME
          dataKey = 'userByUsername'
          childKey = 'post'
        }

        cache.updateQuery({ query, variables }, (data) => {
          if (!data) return // abort cache update
          const cachedPostList: TPost[] = childKey ? data[dataKey][childKey] : data[dataKey]

          return {
            [dataKey]: [...cachedPostList, insertPost]
          }
        })
      }
    })
    handleResult(errors, 'Your post has been successfully created', cb)
  }

  /* update post function */
  const updatePost = async (formData: TCardCreatePostForm, cb: () => void, isLinkPost: boolean) => {
    if (!me) return
    setLoading(true)

    const uploadImgUrls = await handleUploadImages(isLinkPost, formData.images, setLoading)

    const { errors } = await editPost({
      variables: {
        ...formData,
        images: uploadImgUrls,
        user_id: me?.id
      },
      optimisticResponse: {
        updatePost: {
          ...formData,
          images: uploadImgUrls,
          __typename: 'Post'
        }
      }
    })
    handleResult(errors, 'Your post has been successfully updated', cb)
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
        cb(false)
        return null
      }
    }
    return uploadedUrls
  }

  /* show toast at the end of every operation */
  function handleResult(errors: readonly GraphQLError[] | undefined, text: string, cb: () => void) {
    if (errors) {
      setLoading(false)
      toast.error(errors[0].message)
    }
    toast.success(text)
    cb()
    setLoading(false)
  }

  return { updatePost, createPost, loading }
}

export default usePostCreateAndEdit
