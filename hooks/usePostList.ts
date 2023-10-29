import { QUERY_LIMIT } from '@/constants/enums'
import { TPost, TUsePostListResponse } from '@/constants/types'
import { GET_PAGINATED_POST_LIST } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

function usePostList(initialPostList?: TPost[] | null): TUsePostListResponse {
  const { data, loading, error, fetchMore } = useQuery(GET_PAGINATED_POST_LIST, {
    variables: {
      offset: 0,
      limit: QUERY_LIMIT
    }
  })
  const postList: TPost[] = data?.postPaginatedList || initialPostList

  return { postList, loading: loading && !postList, error, fetchMore }
}

export default usePostList
