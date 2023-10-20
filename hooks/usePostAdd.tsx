import { client } from '@/apollo-client'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { BUCKET, BUCKET_SUBFOLDER } from '@/constants/enums'
import { TCardCreatePostForm } from '@/constants/types'
import { ADD_POST } from '@/graphql/mutations'
import { GET_POST_LIST, GET_POST_LIST_BY_SUB_ID, GET_POST_LIST_BY_USER_ID } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as rid } from 'uuid'

function usePostAdd() {
  const supabase = useSupabaseClient()
  const { session } = useAppSession()
  const me = session?.userDetail
  const [loading, setLoading] = useState(false)
  const [addPost] = useMutation(ADD_POST)
  const {
    query: { subreddit: subName, username }
  } = useRouter()

  /* upload file */
  const uploadFiles = async (files: FileList): Promise<string[] | null> => {
    const filePaths: string[] = []
    for (const file of files) {
      const { data, error } = await supabase!.storage.from(BUCKET).upload(`${BUCKET_SUBFOLDER}/${rid()}.png`, file, {
        cacheControl: '3600',
        upsert: false
      })
      if (error) {
        toast.error(error.message)
        return null
      }
      data && filePaths.push(`${BUCKET}/` + data.path)
    }
    return filePaths
  }

  /* create post */
  const createPost = async (formData: TCardCreatePostForm, cb: () => void, isLinkPost: boolean, subId?: number | undefined) => {
    if (!me) return
    setLoading(true)

    const { body, subreddit_id, title, link, linkDescription } = formData
    let images: string[] | null = null

    /* ---------------------------Upload image (OPTIONAL)--------------------------*/
    if (!isLinkPost && formData.images && formData.images.length > 0) {
      images = await uploadFiles(formData.images)
      if (!images) return setLoading(false)
    }

    /* ----------------------------------Mutate db---------------------------------*/
    const { data, errors } = await addPost({
      variables: {
        body: !isLinkPost ? body : linkDescription,
        subreddit_id: subId ?? subreddit_id,
        title,
        user_id: me?.id,
        images,
        link
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
    if (subName && subId) {
      variables = { variables: { id: subId } }
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

  return { createPost, loading }
}

export default usePostAdd

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
