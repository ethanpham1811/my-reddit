import { RdToast } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TPost, TSubreddit } from '@/constants/types'
import { DELETE_COMMENTS_BY_POST_ID, DELETE_POST, DELETE_VOTES_BY_POST_ID } from '@/graphql/mutations'
import { GET_POST_LIST, GET_SUBREDDIT_BY_NAME, GET_SUBREDDIT_LIST_SHORT, GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloCache, DocumentNode, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

function usePostDelete() {
  const [loading, setLoading] = useState(false)
  const { session } = useAppSession()
  const me = session?.userDetail
  const { data: subList } = useQuery(GET_SUBREDDIT_LIST_SHORT)
  const {
    query: { postid, subreddit: subName, username },
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
            update: (cache: ApolloCache<any>, { data: { deletePost } }) => {
              // default: home page
              let query: DocumentNode = GET_POST_LIST
              let variables: {} = {}
              let dataKey: string = 'postList'
              let childKey: string | null = null

              // subreddit page
              if (subName) {
                /// retrieve subreddit name by id from subreddit list
                const sub_name = (subList as { subredditList: TSubreddit[] })?.subredditList?.find(
                  (sub) => sub.id === deletePost?.subreddit?.id
                )?.name
                if (!sub_name) return // abort cache update

                variables = { name: subName }
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
                  [dataKey]: cachedPostList.filter((post: TPost) => post.id !== deletePost.id)
                }
              })
            }
          })
        }),
      {
        loading: <RdToast message="Deleting your post..." />,
        success: <RdToast message="Successfully deleted post" />,
        error: <RdToast message="Deleting post failed" />
      }
    )

    // redirect to subreddit page if user is on deleted post page
    postid && navigate(`/r/${subName}`)
    setLoading(false)
  }

  return { deletePostData, loading }
}

export default usePostDelete
