import { SUBREDDIT_LIST_FOR } from '@/constants/enums'
import { TSubreddit } from '@/constants/types'
import { GET_SUBREDDIT_LIST_FULL, GET_SUBREDDIT_LIST_SHORT } from '@/graphql/quries'
import { ApolloError, useQuery } from '@apollo/client'

function useSubredditList(useFor: SUBREDDIT_LIST_FOR): [TSubreddit[] | null, boolean, ApolloError | undefined] {
  const { data, loading, error } = useQuery(useFor == SUBREDDIT_LIST_FOR.createPostSelect ? GET_SUBREDDIT_LIST_SHORT : GET_SUBREDDIT_LIST_FULL)
  const subredditList = data?.subredditList

  return [subredditList, loading, error]
}

export default useSubredditList
