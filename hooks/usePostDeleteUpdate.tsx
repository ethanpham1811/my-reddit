import { RdToast } from '@/components'
import { DELETE_COMMENTS_BY_POST_ID, DELETE_POST, DELETE_VOTES_BY_POST_ID, UPDATE_POST } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

type TUpadatePostPayload = {
  body: string
  images: string[]
  title: string
  link: string
}

function usePostDeleteUpdate() {
  const [loading, setLoading] = useState(false)
  const {
    query: { postid, subreddit: subName },
    push: navigate
  } = useRouter()

  /* mutations */
  const [updatePost] = useMutation(UPDATE_POST)

  const [deleteVotes] = useMutation(DELETE_VOTES_BY_POST_ID)
  const [deleteComments] = useMutation(DELETE_COMMENTS_BY_POST_ID)
  const [deletePost] = useMutation(DELETE_POST)

  async function deletePostData(id: string) {
    setLoading(true)
    toast
      .promise(deleteComments({ variables: { post_id: id } }), {
        loading: <RdToast message="Deleting comments of post..." />,
        success: <RdToast message="Successfully deleted comments" />,
        error: <RdToast message="Deleting post's comments failed" />
      })
      .then(() => {
        // delete post's votes
        toast.promise(deleteVotes({ variables: { post_id: id } }), {
          loading: <RdToast message="Deleting votes of post..." />,
          success: <RdToast message="Successfully deleted votes" />,
          error: <RdToast message="Deleting post's votes failed" />
        })
      })
      .then(() => {
        // delete post
        toast.promise(deletePost({ variables: { id: id } }), {
          loading: <RdToast message="Deleting post..." />,
          success: <RdToast message="Successfully deleted post" />,
          error: <RdToast message="Deleting post failed" />
        })
      })

    // TODO: cache update

    // redirect to subreddit page if user is on deleted post page
    postid && navigate(`/r/${subName}`)
    setLoading(false)
  }

  async function editPostData(payload: TUpadatePostPayload) {
    setLoading(true)
    toast.promise(updatePost({ variables: { post_id: postid, ...payload } }), {
      loading: <RdToast message="Updating your post..." />,
      success: <RdToast message="Successfully updated post" />,
      error: <RdToast message="Updating post failed" />
    })
    // TODO: cache update

    // redirect to subreddit page if user is on deleted post page
    setLoading(false)
  }

  return { deletePostData, editPostData, loading }
}

export default usePostDeleteUpdate
