import { TPost, TUserDetail } from '@/constants/types'
import { GET_USER_BY_EMAIL } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
type TUseSubredditByEmailResponse = [TUserDetail | null, TPost[] | null, boolean, ApolloError | undefined]

function useUserByEmail(email: string | null | string[] | undefined): TUseSubredditByEmailResponse {
  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    skip: email == null,
    variables: { email }
  })
  const user: TUserDetail = data?.userByEmail
  const userPosts: TPost[] = user?.post

  return [user, userPosts, loading, error]
}

export default useUserByEmail
