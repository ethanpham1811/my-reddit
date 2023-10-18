import { client } from '@/apollo-client'
import { RdToast } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TCardCreatePostForm } from '@/constants/types'
import { ADD_POST } from '@/graphql/mutations'
import { GET_POST_LIST, GET_POST_LIST_BY_SUB_ID, GET_POST_LIST_BY_USER_ID } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

function useAddPost() {
  const supabase = useSupabaseClient()
  const { session } = useAppSession()
  const me = session?.userDetail
  console.log(me)
  const [loading, setLoading] = useState(false)
  const [addPost] = useMutation(ADD_POST)
  const {
    query: { subreddit: subName, username }
  } = useRouter()

  /* upload file */
  const uploadFiles = async (files: FileList): Promise<string[]> => {
    const filePaths: string[] = []
    for (const file of files) {
      const { data, error: uploadErr } = await supabase!.storage.from('post_images').upload(file.name, file, {
        cacheControl: '3600',
        upsert: false
      })
      data && filePaths.push(data.path)
      // uploadErr && toast this
    }
    return filePaths
  }

  const createPost = async (formData: TCardCreatePostForm, cb: () => void, isLinkPost: boolean, subId?: number | undefined) => {
    if (!me) return
    setLoading(true)

    const { body, subreddit_id, title, link, linkDescription } = formData
    let images: string[] | null = null

    // if there is any uploaded images
    console.log(formData.images)
    if (!isLinkPost && formData.images && formData.images.length > 0) {
      images = await uploadFiles(formData.images)
    }

    console.log(images, body)
    console.log(link)
    // return
    // mutate db
    let newPost = null
    toast.promise(
      addPost({
        variables: {
          body: !isLinkPost ? body : linkDescription,
          subreddit_id: subId ?? subreddit_id,
          title,
          user_id: me?.id,
          images,
          link
        }
      }).then((res) => {
        console.log(res)
        newPost = res?.data?.insertPost
        cb()
      }),
      {
        loading: <RdToast message="Post processing..." />,
        success: <RdToast message="Successfully posted" />,
        error: <RdToast message="Posting failed" />
      }
    )

    /* retrieve respective query by type of page */
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

    // get cached data
    const cachedData = client.readQuery({ query: cachedQuery, ...variables })
    if (!cachedData) {
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

    setLoading(false)
  }

  return { createPost, loading }
}

export default useAddPost
