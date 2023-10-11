import { TPost, TUsePostListResponse } from '@/constants/types'
import { GET_POST_LIST } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

function usePostList(): TUsePostListResponse {
  const { data, loading, error } = useQuery(GET_POST_LIST)
  const postList: TPost[] = data?.postList

  return [postList, loading, error]
}

export default usePostList
