import { TUserDetail } from '@/constants/types'
import { GET_USER_BY_EMAIL } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

type TUseUserByEmailResponse = [TUserDetail | null, boolean, ApolloError | undefined]

function useUserByEmail(email: string | null | string[] | undefined): TUseUserByEmailResponse {
  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    skip: email == null,
    variables: { email }
  })
  const user: TUserDetail = data?.userByEmail

  return [user, loading, error]
}

export default useUserByEmail
