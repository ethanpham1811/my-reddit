import { TFetchMoreArgs, TQueriedPost, TQueriedResult, TQueriedSub, TQueriedUser } from '@/constants/types'
import { GET_SEARCHED_RESULTS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'

type TUseSearchQueriedListResponse = TQueriedResult & {
  loading: boolean
  error: ApolloError | undefined
  fetchMore: FetchMoreFunction<{ [key: string]: TQueriedResult }, TFetchMoreArgs>
}

function useSearchQueriedList(searchTerm: string | string[] | undefined): TUseSearchQueriedListResponse {
  const { data, loading, error, fetchMore } = useQuery(GET_SEARCHED_RESULTS, {
    variables: { quantity: 5, term: typeof searchTerm !== 'string' ? '' : searchTerm }
  })
  const queriedPosts: TQueriedPost[] = data?.queriedPosts ?? []
  const queriedSubs: TQueriedSub[] = data?.queriedSubs ?? []
  const queriedUsers: TQueriedUser[] = data?.queriedUsers ?? []

  return { queriedPosts, queriedSubs, queriedUsers, loading, error, fetchMore }
}
export default useSearchQueriedList
