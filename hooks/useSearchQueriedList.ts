import { TQueriedPost, TQueriedSub, TQueriedUser } from '@/constants/types'
import { GET_SEARCHED_RESULTS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

type TUseSearchQueriedListResponse = [
  queriedPosts: TQueriedPost[],
  queriedSubs: TQueriedSub[],
  queriedUsers: TQueriedUser[],
  loading: boolean,
  error: ApolloError | undefined
]

function useSearchQueriedList(searchTerm: string | string[] | undefined): TUseSearchQueriedListResponse {
  const { data, loading, error } = useQuery(GET_SEARCHED_RESULTS, {
    variables: { quantity: 3, term: typeof searchTerm !== 'string' ? '' : searchTerm }
  })
  const queriedPosts: TQueriedPost[] = data?.queriedPosts ?? []
  const queriedSubs: TQueriedSub[] = data?.queriedSubs ?? []
  const queriedUsers: TQueriedUser[] = data?.queriedUsers ?? []

  return [queriedPosts, queriedSubs, queriedUsers, loading, error]
}
export default useSearchQueriedList
