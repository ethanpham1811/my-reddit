import { UPDATE_POST_WITH_VOTE_FRAG } from '@/src/graphql/fragments'
import { ADD_VOTE } from '@/src/graphql/mutations'
import { ApolloCache, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

/**
 * create vote:
 * - with optimistic update
 * - with cache update
 */
function useVoteAdd() {
  const [mutateVote] = useMutation(ADD_VOTE)

  const addVote = async (isUpvoteBtn: boolean, myId: number, postId: number) => {
    const { errors } = await mutateVote({
      variables: {
        post_id: postId,
        user_id: myId,
        upvote: isUpvoteBtn
      },
      optimisticResponse: {
        insertVote: {
          id: 'temp_id',
          user_id: myId,
          upvote: isUpvoteBtn,
          __typename: 'Vote'
        }
      },
      update: (cache: ApolloCache<any>, { data: { insertVote } }) => {
        const postCacheId = `Post:${postId}`

        cache.updateFragment(
          {
            id: postCacheId,
            fragment: UPDATE_POST_WITH_VOTE_FRAG
          },
          (data) => {
            return {
              ...data,
              vote: [...data.vote, insertVote]
            }
          }
        )
      }
    })
    if (errors) toast.error(errors[0].message)
  }
  return { addVote }
}

export default useVoteAdd
