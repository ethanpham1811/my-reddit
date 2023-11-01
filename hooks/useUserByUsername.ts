import { QUERY_LIMIT } from '@/constants/enums'
import { TFetchMoreArgs, TPost, TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME_WITH_POSTS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'

type TUseUserByUsernameResponse = {
  user: TUserDetail | null
  userPosts: TPost[] | null
  loading: boolean
  error: ApolloError | undefined
  fetchMore: FetchMoreFunction<{ [key: string]: TPost[] }, TFetchMoreArgs>
}

function useUserByUsername(
  username: string | string[] | undefined,
  initialUser?: TUserDetail | null,
  initialPostList?: TPost[] | null
): TUseUserByUsernameResponse {
  const { data, loading, error, fetchMore } = useQuery(GET_USER_BY_USERNAME_WITH_POSTS, {
    variables: { username, offset: 0, limit: QUERY_LIMIT }
  })
  const user: TUserDetail = data?.userByUsernameWithPosts || initialUser
  const userPosts: TPost[] = user?.post || initialPostList

  return { user, userPosts, loading: loading && !user, error, fetchMore }
}

export default useUserByUsername
