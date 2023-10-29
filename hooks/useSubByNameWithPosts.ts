import { QUERY_LIMIT } from '@/constants/enums'
import { TPost, TSubredditDetail, TUseSubByNameResponse } from '@/constants/types'
import { GET_SUBREDDIT_BY_NAME_WITH_POSTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

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
