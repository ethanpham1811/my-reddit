import { QUERY_LIMIT } from '@/constants/enums'
import { TQueriedPost, TQueriedResponse, TQueriedSub, TQueriedUser } from '@/constants/types'
import { GET_SEARCHED_RESULTS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

type TUseSearchQueriedListResponse = TQueriedResponse & {
  loading: boolean
  error: ApolloError | undefined
}

function useSearchQueriedList(searchTerm: string | string[] | undefined): TUseSearchQueriedListResponse {
  const {
    query: { page }
  } = useRouter()

  // fetch paginated data by query params
  const curPage = page ? parseInt(page as string) : 1
  const offset = curPage ? (curPage - 1) * QUERY_LIMIT : 0

  const { data, loading, error } = useQuery(GET_SEARCHED_RESULTS, {
    variables: { offset, limit: QUERY_LIMIT, term: typeof searchTerm !== 'string' ? '' : searchTerm }
  })
  const queriedPosts: TQueriedPost[] = data?.queriedPosts ?? []
  const queriedSubs: TQueriedSub[] = data?.queriedSubs ?? []
  const queriedUsers: TQueriedUser[] = data?.queriedUsers ?? []

  return { queriedPosts, queriedSubs, queriedUsers, loading, error }
}
export default useSearchQueriedList
