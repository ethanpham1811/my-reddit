import { TPost, TUsePostListResponse } from '@/constants/types'
import { GET_POST_LIST_BY_SUB_ID } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

function usePostListBySubId(subId: number | undefined): TUsePostListResponse {
  const { data, loading, error } = useQuery(GET_POST_LIST_BY_SUB_ID, { skip: subId === null || subId === undefined, variables: { id: subId } })
  const postList: TPost[] = data?.postUsingPost_subreddit_id_fkey

  return [postList, loading, error]
}

export default usePostListBySubId
