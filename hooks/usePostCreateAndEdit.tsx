import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardCreatePostForm, TPost } from '@/constants/types'
import { ADD_POST, UPDATE_POST } from '@/graphql/mutations'
import { GET_POST_LIST, GET_POST_LIST_BY_SUB_ID, GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloCache, DocumentNode, useMutation } from '@apollo/client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSupabaseUpload from './useSupabaseUpload'

function usePostCreateAndEdit() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [loading, setLoading] = useState(false)
  const [uploadFiles] = useSupabaseUpload()
  const [insertPost] = useMutation(ADD_POST)
  const [updatePost] = useMutation(UPDATE_POST)

  // map function for dynamically use
  const functionList = {
    insertPost,
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
    const { errors } = await functionList[isCreate ? 'insertPost' : 'updatePost']({
      variables: {
        id,
        user_id: me?.id,
        subreddit_id,
        body,
        title,
        images,
        link,
        linkDescription
      },
      update: (proxy, { data: { insertPost, updatePost } }) => {
        updateCache(insertPost || updatePost, proxy, isCreate, GET_POST_LIST, 'postList')
        updateCache(insertPost || updatePost, proxy, isCreate, GET_POST_LIST_BY_SUB_ID, 'postUsingPost_subreddit_id_fkey', { id: subreddit_id })
        updateCache(insertPost || updatePost, proxy, isCreate, GET_USER_BY_USERNAME, ['userByUsername', 'post'], { username: me.username })
      }
    })
    if (errors) {
      setLoading(false)
      toast.error(errors[0].message)
    }
    toast.success('Your article has been successfully posted')
    cb()
    setLoading(false)
  }

  function updateCache(newPost: TPost, proxy: ApolloCache<any>, isCreate: boolean, query: DocumentNode, queryKey: string | string[], variables?: {}) {
    const data: unknown = proxy.readQuery({ query, variables })
    console.log(data)
    if (!data) return
    let cachedData
    let key

    if (Array.isArray(queryKey)) {
      const rootKey = queryKey[0]
      key = queryKey[1]
      cachedData = (data as { [rootKey: string]: { [key: string]: TPost[] } })[rootKey as string]
    } else {
      key = queryKey
      cachedData = data as { [queryKey: string]: TPost[] }
    }

    console.log(cachedData)

    if (isCreate) {
      cachedData[key].push(newPost)
      console.log('here')
    } else {
      const listByUserIndex = cachedData[key].findIndex((post) => post.id === newPost.id)
      cachedData[key][listByUserIndex] = newPost
    }
    console.log(cachedData)
    proxy.writeQuery({ query, variables, data: data })
  }

  return { mutatePost, loading }
}

export default usePostCreateAndEdit

// const data: unknown = proxy.readQuery({ query, variables })
// if (!data) return
// const cachedData = data as { [queryKey: string]: TPost[] }

// console.log(data)

// if (isCreate) {
//   cachedData[queryKey].push(newPost)
// } else {
//   const listByUserIndex = cachedData[queryKey].findIndex((post) => post.id === newPost.id)
//   cachedData[queryKey][listByUserIndex] = newPost
// }
// console.log(data)
// proxy.writeQuery({ query, variables, data: data })
