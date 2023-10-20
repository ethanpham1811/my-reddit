import { TVote } from '@/constants/types'
import { ADD_VOTE } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

function useVoteAdd() {
  const [mutateVote] = useMutation(ADD_VOTE)

  const addVote = async (
    voteCount: number,
    setVoteCount: Dispatch<SetStateAction<number>>,
    setCurrentVote: Dispatch<SetStateAction<TVote | undefined>>,
    isUpvoteBtn: boolean,
    myId: number,
    postId: number
  ) => {
    // optimistic update
    setVoteCount(voteCount + (isUpvoteBtn ? 1 : -1))
    setCurrentVote({ id: +postId, user_id: +myId, upvote: isUpvoteBtn })

    // mutation
    const { data, errors } = await mutateVote({
      variables: {
        post_id: postId,
        user_id: myId,
        upvote: isUpvoteBtn
      }
    })
    if (errors) {
      toast.error(errors[0].message)

      // revert optimistic value
      setVoteCount(voteCount - (isUpvoteBtn ? 1 : -1))
      setCurrentVote(undefined)
    }
    setCurrentVote(data.insertVote)
  }

  return { addVote }
}

export default useVoteAdd
