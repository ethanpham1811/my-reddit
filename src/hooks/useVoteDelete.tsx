import { DELETE_VOTE } from '@/src/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

/**
 * delete vote:
 * - with optimistic update
 * - with cache update
 */
function useVoteDelete() {
  const [mutateVote] = useMutation(DELETE_VOTE)

  const deleteVote = async (voteId: number) => {
    const { errors } = await mutateVote({
      variables: {
        id: voteId
      },
      optimisticResponse: {
        deleteVote: {
          id: voteId,
          __typename: 'Vote'
        }
      },
      update: (cache: ApolloCache<any>, { data: { deleteVote } }) => {
        const voteCacheId = cache.identify(deleteVote)
        if (voteCacheId) cache.evict({ id: voteCacheId })
      }
    })
    if (errors) toast.error(errors[0].message)
  }

  return { deleteVote }
}

export default useVoteDelete
