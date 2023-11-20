import { TPost, TSubredditDetail } from '@/src/constants/types'
import { GET_SUBREDDIT_BY_NAME } from '@/src/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

type TUseSubredditByNameResponse = [TSubredditDetail | null, TPost[] | null, boolean, ApolloError | undefined]

function useSubByName(name: string | string[] | undefined): TUseSubredditByNameResponse {
  const { data, loading, error } = useQuery(GET_SUBREDDIT_BY_NAME, { skip: name === null || name === undefined, variables: { name } })
  const subreddit: TSubredditDetail = data?.subredditByName
  const subredditPosts: TPost[] = subreddit?.post

  return [subreddit, subredditPosts, loading, error]
}

export default useSubByName
