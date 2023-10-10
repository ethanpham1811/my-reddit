import { TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

function useUserByUsername(username: string | null | string[] | undefined): [TUserDetail | null, boolean, ApolloError | undefined] {
  const { data, loading, error } = useQuery(GET_USER_BY_USERNAME, { skip: username == null, variables: { username } })
  const user: TUserDetail = data?.userByUsername

  return [user, loading, error]
}

export default useUserByUsername
