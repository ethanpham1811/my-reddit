import { TPost, TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
type TUseSubredditByNameResponse = [TUserDetail | null, TPost[] | null, boolean, ApolloError | undefined]

function useUserByUsername(username: string | null | string[] | undefined): TUseSubredditByNameResponse {
  const { data, loading, error } = useQuery(GET_USER_BY_USERNAME, {
    skip: username == null,
    variables: { username }
  })
  const user: TUserDetail = data?.userByUsername
  const userPosts: TPost[] = user?.post

  return [user, userPosts, loading, error]
}

export default useUserByUsername
