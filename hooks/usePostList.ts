import { TPost } from '@/constants/types'
import { GET_POST_LIST } from '@/graphql/quries'
import { ApolloError, useQuery } from '@apollo/client'

function usePostList(): [TPost[] | null, boolean, ApolloError | undefined] {
  const { data, loading, error } = useQuery(GET_POST_LIST)
  const posts: TPost[] = data?.postList

  return [posts, loading, error]
}

export default usePostList
