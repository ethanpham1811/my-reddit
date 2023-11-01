import { QUERY_LIMIT } from '@/constants/enums'
import { TFetchMoreArgs, TPost } from '@/constants/types'
import { GET_PAGINATED_POST_LIST } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'

type TUsePostListResponse = {
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined
  fetchMore: FetchMoreFunction<{ [key: string]: TPost[] }, TFetchMoreArgs>
}

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
