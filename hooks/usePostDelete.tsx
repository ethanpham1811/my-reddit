import { RdToast } from '@/components'
import { DELETE_COMMENTS_BY_POST_ID, DELETE_POST, DELETE_VOTES_BY_POST_ID } from '@/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

/**
 * Delete Post flow:
 * - delete comments of post
 * - delete votes of post
 * - delete the post
 *
 * Abort if any of above failed
 * Return to subreddit page on success
 */
function usePostDelete() {
  const [loading, setLoading] = useState(false)
  const {
    query: { postid, subreddit: subName },
    push: navigate
  } = useRouter()

  /* mutations */
  const [deleteComments] = useMutation(DELETE_COMMENTS_BY_POST_ID)
  const [deleteVotes] = useMutation(DELETE_VOTES_BY_POST_ID)
  const [deletePost] = useMutation(DELETE_POST)

  async function deletePostData(post_id: string) {
    setLoading(true)
    await toast.promise(
      // delete post's comments
      deleteComments({
        variables: { post_id }
      }).then(({ errors }) => {
        handleError(errors)

        // delete post's votes
        deleteVotes({ variables: { post_id } }).then(({ errors }) => {
          handleError(errors)

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
          }).then(({ errors }) => handleError(errors))
        })
      }),
      {
        loading: <RdToast message="Deleting your post..." />,
        success: <RdToast message="Successfully deleted post" />,
        error: <RdToast message="Deleting post failed" />
      }
    )

    // redirect to subreddit page if user is on deleted post page
    if (postid) return navigate(`/r/${subName}`)
    setLoading(false)
  }

  function handleError(errors: readonly GraphQLError[] | undefined) {
    if (errors) {
      setLoading(false)
      throw new Error(errors[0].message)
    }
  }

  return { deletePostData, loading }
}

export default usePostDelete
