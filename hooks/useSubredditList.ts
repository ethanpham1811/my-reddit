import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import { TUseSubredditListResponse } from '@/constants/types'
import { GET_SUBREDDIT_LIST_FULL, GET_SUBREDDIT_LIST_SHORT } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

function useSubredditList(mode: SUBREDDIT_LIST_MODE): TUseSubredditListResponse {
  const { data, loading, error } = useQuery(mode == SUBREDDIT_LIST_MODE.Simple ? GET_SUBREDDIT_LIST_SHORT : GET_SUBREDDIT_LIST_FULL)
  const subredditList = data?.subredditList

  return { subredditList, loading, error }
}

export default useSubredditList
