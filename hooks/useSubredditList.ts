import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import { TSubreddit } from '@/constants/types'
import { GET_SUBREDDIT_LIST, GET_SUBREDDIT_LIST_SHORT } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

type TUseSubredditListResponse = {
  subredditList: TSubreddit[] | null
  loading: boolean
  error: ApolloError | undefined
}

function useSubredditList(mode: SUBREDDIT_LIST_MODE): TUseSubredditListResponse {
  const { data, loading, error } = useQuery(mode == SUBREDDIT_LIST_MODE.Simple ? GET_SUBREDDIT_LIST_SHORT : GET_SUBREDDIT_LIST)
  const subredditList = data?.subredditList

  return { subredditList, loading, error }
}

export default useSubredditList
