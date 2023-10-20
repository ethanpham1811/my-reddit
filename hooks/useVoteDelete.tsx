import { TVote } from '@/constants/types'
import { DELETE_VOTE } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

function useVoteDelete() {
  const [mutateVote] = useMutation(DELETE_VOTE)

  const deleteVote = async (
    voteCount: number,
    setVoteCount: Dispatch<SetStateAction<number>>,
    currentVote: TVote,
    setCurrentVote: Dispatch<SetStateAction<TVote | undefined>>,
    isUpvoteBtn: boolean,
    voteId: number
  ) => {
    // optimistic update
    setVoteCount(voteCount + (isUpvoteBtn ? -1 : +1))
    setCurrentVote(undefined)

    // mutation
    const { errors } = await mutateVote({
      variables: {
        id: voteId
      }
    })
    if (errors) {
      toast.error(errors[0].message)

      // revert optimistic value
      setVoteCount(voteCount - (isUpvoteBtn ? -1 : +1))
      setCurrentVote(currentVote)
    }

    setCurrentVote(undefined)
  }

  return { deleteVote }
}

export default useVoteDelete
