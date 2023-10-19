import { RdIconSelect, RdToast } from '@/components'
import { MoreHorizIcon } from '@/constants/icons'
import { TSelectOption } from '@/constants/types'
import { DELETE_COMMENTS_BY_POST_ID, DELETE_POST, DELETE_VOTES_BY_POST_ID } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

function ActionMenu({ postId }: { postId: number }) {
  const {
    query: { postid, subreddit: subName },
    push: navigate
  } = useRouter()
  const [loading, setLoading] = useState(false)

  /* mutations */
  const [deleteVotes] = useMutation(DELETE_VOTES_BY_POST_ID)
  const [deleteComments] = useMutation(DELETE_COMMENTS_BY_POST_ID)
  const [deletePost] = useMutation(DELETE_POST)

  /* action options */
  const postActionOptions: TSelectOption[] = [
    {
      title: 'Edit',
      cb: handleEditPost
    },
    {
      title: 'Delete',
      cb: handleDeletePost
    }
  ]

  function handleEditPost() {
    //TODO: edit post
  }

  async function handleDeletePost() {
    setLoading(true)
    toast
      .promise(deleteComments({ variables: { post_id: postId } }), {
        loading: <RdToast message="Deleting comments of post..." />,
        success: <RdToast message="Successfully deleted comments" />,
        error: <RdToast message="Deleting post's comments failed" />
      })
      .then(() => {
        // delete post's votes
        toast.promise(deleteVotes({ variables: { post_id: postId } }), {
          loading: <RdToast message="Deleting votes of post..." />,
          success: <RdToast message="Successfully deleted votes" />,
          error: <RdToast message="Deleting post's votes failed" />
        })
      })
      .then(() => {
        // delete post
        toast.promise(deletePost({ variables: { id: postId } }), {
          loading: <RdToast message="Deleting post..." />,
          success: <RdToast message="Successfully deleted posted" />,
          error: <RdToast message="Deleting post failed" />
        })
      })

    // TODO: cache update

    // redirect to subreddit page if user is on deleted post page
    postid && navigate(`/r/${subName}`)
    setLoading(false)
  }

  return (
    <RdIconSelect
      disabled={loading}
      position={{ left: '-70px' }}
      disableRipple
      size="small"
      options={postActionOptions}
      icon={MoreHorizIcon}
      sx={{ position: 'absolute', top: 0, right: '0.5rem', color: 'hintText.main', '&:hover': { color: 'inherit' } }}
    />
  )
}

export default ActionMenu
