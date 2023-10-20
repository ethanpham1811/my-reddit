import { TVote } from '@/constants/types'
import { UPDATE_VOTE } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

function useVoteUpdate() {
  const [mutateVote] = useMutation(UPDATE_VOTE)

  const updateVote = async (
    voteCount: number,
    setVoteCount: Dispatch<SetStateAction<number>>,
    currentVote: TVote,
    setCurrentVote: Dispatch<SetStateAction<TVote | undefined>>,
    isUpvoteBtn: boolean,
    isUpvoted: boolean,
    voteId: number
  ) => {
    // optimistic update
    setVoteCount(voteCount + (isUpvoteBtn ? 2 : -2))
    setCurrentVote({ ...currentVote, upvote: !isUpvoted })

    // mutation
    const { data, errors } = await mutateVote({
      variables: {
        id: voteId,
        upvote: !isUpvoted
      }
    })
    if (errors) {
      toast.error(errors[0].message)

      // revert optimistic value
      setVoteCount(voteCount - (isUpvoteBtn ? 2 : -2))
      setCurrentVote(currentVote)
    }
    setCurrentVote(data.updateVote)
  }

  return { updateVote }
}

export default useVoteUpdate
