import { TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

function useUserByUsername(username: string | string[] | undefined): [TUserDetail | null, boolean, ApolloError | undefined] {
  const { data, loading, error } = useQuery(GET_USER_BY_USERNAME, { skip: username === null || username === undefined, variables: { username } })
  const user: TUserDetail = data?.userByUsername

  return [user, loading, error]
}

export default useUserByUsername
