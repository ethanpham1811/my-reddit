import { RdToast } from '@/components'
import { DELETE_COMMENTS_BY_POST_ID, DELETE_POST, DELETE_VOTES_BY_POST_ID } from '@/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

function usePostDelete() {
  const [loading, setLoading] = useState(false)
  const {
    query: { postid, subreddit: subName, username },
    push: navigate
  } = useRouter()

  /* mutations */
  const [deleteVotes] = useMutation(DELETE_VOTES_BY_POST_ID)
  const [deleteComments] = useMutation(DELETE_COMMENTS_BY_POST_ID)
  const [deletePost] = useMutation(DELETE_POST)

  async function deletePostData(post_id: string) {
    setLoading(true)
    toast.promise(
      deleteComments({
        variables: { post_id }
      })
        .then(() => {
          // delete post's votes
          deleteVotes({ variables: { post_id } })
        })
        .then(() => {
          // delete post
          deletePost({
            variables: { id: post_id },
            optimisticResponse: {
              deletePost: {
                id: post_id,
                __typename: 'Post'
              }
            },
            update: (cache: ApolloCache<any>, { data: { deletePost } }) => {
              const postCacheId = cache.identify(deletePost)
              if (postCacheId) cache.evict({ id: postCacheId })
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
