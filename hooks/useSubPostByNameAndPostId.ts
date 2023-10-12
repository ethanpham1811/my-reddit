import { TPost, TSubredditDetail } from '@/constants/types'
import { GET_POST_AND_SUB_BY_POST_ID } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

type TUsePostByPostidResponse = [TSubredditDetail | null, TPost | null, boolean, ApolloError | undefined]

function useSubPostByNameAndPostId(name: string | string[] | undefined, id: string | string[] | undefined): TUsePostByPostidResponse {
  const { data, loading, error } = useQuery(GET_POST_AND_SUB_BY_POST_ID, {
    skip: id === null || id === undefined || name === null || name === undefined,
    variables: { id, name }
  })
  const subreddit: TSubredditDetail = data?.subredditByName
  const subredditPost: TPost = data?.post

  return [subreddit, subredditPost, loading, error]
}

export default useSubPostByNameAndPostId
