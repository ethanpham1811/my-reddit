import { UPDATE_VOTE } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

function useVoteUpdate() {
  const [mutateVote] = useMutation(UPDATE_VOTE)

  const updateVote = async (isUpvoted: boolean, voteId: number, myId: number) => {
    const { errors } = await mutateVote({
      variables: {
        id: voteId,
        upvote: !isUpvoted
      },
      optimisticResponse: {
        updateVote: {
          id: voteId,
          user_id: myId,
          upvote: !isUpvoted,
          __typename: 'Vote'
        }
      }
    })
    if (errors) toast.error(errors[0].message)
  }

  return { updateVote }
}

export default useVoteUpdate
