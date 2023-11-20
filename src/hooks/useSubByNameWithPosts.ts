import { QUERY_LIMIT } from '@/src/constants/enums'
import { TFetchMoreArgs, TPost, TSubredditDetail } from '@/src/constants/types'
import { GET_SUBREDDIT_BY_NAME_WITH_POSTS } from '@/src/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'

type TUseSubByNameResponse = {
  subreddit: TSubredditDetail | null
  subredditPosts: TPost[] | null
  loading: boolean
  error: ApolloError | undefined
  fetchMore: FetchMoreFunction<{ [key: string]: TPost[] }, TFetchMoreArgs>
}

function useSubByNameWithPosts(
  subName: string | string[] | undefined,
  initialSubreddit?: TSubredditDetail | null,
  initialPostList?: TPost[] | null
): TUseSubByNameResponse {
  const { data, loading, error, fetchMore } = useQuery(GET_SUBREDDIT_BY_NAME_WITH_POSTS, {
    variables: {
      name: subName,
      offset: 0,
      limit: QUERY_LIMIT
    }
  })
  const subreddit: TSubredditDetail = data?.subredditByNameWithPosts || initialSubreddit
  const subredditPosts: TPost[] = subreddit?.post || initialPostList

  return { subreddit, subredditPosts, loading: loading && !subreddit, error, fetchMore }
}

export default useSubByNameWithPosts
