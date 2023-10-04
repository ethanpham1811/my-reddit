import { GET_TOP_3_POSTS_AND_SUBREDDITS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

function useTop3PostsNSubreddit() {
  const { data, loading, error } = useQuery(GET_TOP_3_POSTS_AND_SUBREDDITS)
  const queryList = data?.data

  return { queryList, loading, error }
}

export default useTop3PostsNSubreddit
