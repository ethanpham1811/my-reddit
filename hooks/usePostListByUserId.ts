import { TPost, TUsePostListResponse } from '@/constants/types'
import { GET_POST_LIST_BY_USER_ID } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

function usePostListByUserId(userId: number | undefined): TUsePostListResponse {
  const { data, loading, error } = useQuery(GET_POST_LIST_BY_USER_ID, { skip: userId === null || userId === undefined, variables: { id: userId } })
  const postList: TPost[] = data?.postUsingPost_user_id_fkey

  return [postList, loading, error]
}

export default usePostListByUserId
