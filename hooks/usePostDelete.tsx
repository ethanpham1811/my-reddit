import { RdToast } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TPost } from '@/constants/types'
import { DELETE_COMMENTS_BY_POST_ID, DELETE_POST, DELETE_VOTES_BY_POST_ID } from '@/graphql/mutations'
import { GET_POST_LIST, GET_POST_LIST_BY_SUB_ID, GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloCache, DocumentNode, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

function usePostDelete() {
  const [loading, setLoading] = useState(false)
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { postid, subreddit: subName },
    push: navigate
  } = useRouter()

  /* mutations */
  const [deleteVotes] = useMutation(DELETE_VOTES_BY_POST_ID)
  const [deleteComments] = useMutation(DELETE_COMMENTS_BY_POST_ID)
  const [deletePost] = useMutation(DELETE_POST)

  async function deletePostData(id: string) {
    setLoading(true)
    toast.promise(
      deleteComments({
        variables: { post_id: id }
      })
        .then(() => {
          // delete post's votes
          deleteVotes({ variables: { post_id: id } })
        })
        .then(() => {
          // delete post
          deletePost({
            variables: { id: id },
            update: (proxy, { data: { deletePost } }) => {
              updateCache(deletePost, proxy, GET_POST_LIST, 'postList')
              updateCache(deletePost, proxy, GET_POST_LIST_BY_SUB_ID, 'postUsingPost_subreddit_id_fkey', { id: deletePost?.subreddit?.id })
              updateCache(deletePost, proxy, GET_USER_BY_USERNAME, ['userByUsername', 'post'], { username: me?.username })
            }
          })
        }),
      {
        loading: <RdToast message="Deleting your post..." />,
        success: <RdToast message="Successfully deleted post" />,
        error: <RdToast message="Deleting post failed" />
      }
    )

    // TODO: cache update

    // redirect to subreddit page if user is on deleted post page
    postid && navigate(`/r/${subName}`)
    setLoading(false)
  }

  function updateCache(newPost: TPost, proxy: ApolloCache<any>, query: DocumentNode, queryKey: string | string[], variables?: {}) {
    const data: unknown = proxy.readQuery({ query, variables })
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

    cachedData[key] = cachedData[key].filter((post) => post.id !== newPost.id)

    console.log(data)
    proxy.writeQuery({ query, variables, data: data })
  }

  return { deletePostData, loading }
}

export default usePostDelete
