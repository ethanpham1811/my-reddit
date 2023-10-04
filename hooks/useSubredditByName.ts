import { TSubredditPage } from '@/constants/types'
import { GET_SUBREDDIT_BY_NAME } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

function useSubredditByName(name: string | string[] | undefined): [TSubredditPage | null, boolean, ApolloError | undefined] {
  const { data, loading, error } = useQuery(GET_SUBREDDIT_BY_NAME, { skip: name === null || name === undefined, variables: { name } })
  const subreddit: TSubredditPage = data?.subredditByName

  return [subreddit, loading, error]
}

export default useSubredditByName
