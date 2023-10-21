import { client } from '@/apollo-client'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardCreatePostForm } from '@/constants/types'
import { ADD_POST, UPDATE_POST } from '@/graphql/mutations'
import { GET_POST_LIST, GET_POST_LIST_BY_SUB_ID, GET_POST_LIST_BY_USER_ID } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSupabaseUpload from './useSupabaseUpload'

function usePostCreateAndEdit() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [loading, setLoading] = useState(false)
  const [uploadFiles] = useSupabaseUpload()
  const [addPost] = useMutation(ADD_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const {
    query: { subreddit: subName, username }
  } = useRouter()

  // map function for dynamically use
  const functionList = {
    addPost,
    updatePost
  }

  /* create or update post function */
  const mutatePost = async (formData: TCardCreatePostForm, cb: () => void, isLinkPost: boolean, type: POST_MUTATION_MODE) => {
    if (!me) return

    setLoading(true)

    const isCreate = type !== POST_MUTATION_MODE.Edit
    const { id, body, subreddit_id, title, link, linkDescription } = formData
    let images: string[] | null = null

    /* ---------------------------Upload image (OPTIONAL)--------------------------*/
    if (!isLinkPost && formData.images && formData.images.length > 0) {
      images = await uploadFiles(formData.images)
      if (!images) return setLoading(false)
    }

    /* ----------------------------------Mutate db---------------------------------*/
    const { data, errors } = await functionList[isCreate ? 'addPost' : 'updatePost']({
      variables: {
        id,
        user_id: me?.id,
        subreddit_id,
        body,
        title,
        images,
        link,
        linkDescription
      }
    })
    if (errors) {
      setLoading(false)
      toast.error(errors[0].message)
    }
    const newPost = data?.insertPost

    /* ----------- retrieve respective query by type of page (OPTIONAL) -----------*/
    // home page (default)
    let cachedQuery = GET_POST_LIST
    let variables = {}
    let gqlKey = 'postList'

    // subreddit page
    if (subName && subreddit_id) {
      variables = { variables: { id: subreddit_id } }
      cachedQuery = GET_POST_LIST_BY_SUB_ID
      gqlKey = 'postUsingPost_subreddit_id_fkey'
    }
    // user profile page
    if (username && me) {
      variables = { variables: { id: me.id } }
      cachedQuery = GET_POST_LIST_BY_USER_ID
      gqlKey = 'postUsingPost_user_id_fkey'
    }

    /* -------------------------- Update cache (OPTIONAL) -------------------------*/
    // get cached data
    const cachedData = client.readQuery({ query: cachedQuery, ...variables })
    if (!cachedData) {
      cb()
      toast.success('Your article has been successfully posted')
      setLoading(false)
      return
    }

    // updating cache
    const userData = cachedData[gqlKey]
    client.writeQuery({
      query: cachedQuery,
      data: {
        [gqlKey]: [...userData, newPost]
      },
      ...variables
    })

    /* --------------------------------- Finishing up --------------------------------*/
    toast.success('Your article has been successfully posted')
    cb()
    setLoading(false)
  }

  return { mutatePost, loading }
}

export default usePostCreateAndEdit

// toast.promise(
//   addPost({
//     variables: {
//       body: !isLinkPost ? body : linkDescription,
//       subreddit_id: subId ?? subreddit_id,
//       title,
//       user_id: me?.id,
//       images,
//       link
//     }
//   }).then((res) => {
//     newPost = res?.data?.insertPost
//     cb()
//   }),
//   {
//     loading: <RdToast message="Post processing..." />,
//     success: <RdToast message="Successfully posted" />,
//     error: <RdToast message="Posting failed" />
//   }
// )
