import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardCreatePostForm, TPost, TSubreddit } from '@/constants/types'
import { ADD_POST, UPDATE_POST } from '@/graphql/mutations'
import { GET_POST_LIST, GET_SUBREDDIT_BY_NAME, GET_SUBREDDIT_LIST_SHORT, GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloCache, DocumentNode, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSupabaseUpload from './useSupabaseUpload'

function usePostCreateAndEdit() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [loading, setLoading] = useState(false)
  const [uploadFiles] = useSupabaseUpload()
  const { data: subList } = useQuery(GET_SUBREDDIT_LIST_SHORT)
  const [insertPost] = useMutation(ADD_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const {
    query: { subreddit: subName, username }
  } = useRouter()

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
      update: (cache: ApolloCache<any>, { data: { insertPost, updatePost } }) => {
        const newPost = insertPost || updatePost

        // default: home page
        let query: DocumentNode = GET_POST_LIST
        let variables: {} = {}
        let dataKey: string = 'postList'
        let childKey: string | null = null

        // subreddit page
        if (subName) {
          // retrieve subreddit name by id from subreddit list
          const sub_name = (subList as { subredditList: TSubreddit[] })?.subredditList?.find((sub) => sub.id === subreddit_id)?.name
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
          let newPostList: TPost[] = cachedPostList

          if (isCreate) {
            newPostList = [...newPostList, newPost]
          } else {
            const updatedPostIndex = newPostList.findIndex((post: TPost) => post.id === newPost.id)
            newPostList[updatedPostIndex] = newPost
          }

          return {
            [dataKey]: newPostList
          }
        })
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

  return { mutatePost, loading }
}

export default usePostCreateAndEdit
