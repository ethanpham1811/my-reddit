import { TPost, TSubredditDetail } from '@/constants/types'
import { GET_POST_BY_ID, GET_SUBREDDIT_BY_NAME } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export type TUseSubredditByNameResponse = {
  subreddit: TSubredditDetail | null
  postDetail: TPost | null
  loading: boolean
  error: ApolloError | null
}

function useSubByNameAndPostById(svSubreddit?: TSubredditDetail | null, svPost?: TPost | null): TUseSubredditByNameResponse {
  const {
    query: { subreddit: subName, postid }
  } = useRouter()

  const {
    data: subData,
    loading: subLoading,
    error: subError = null
  } = useQuery(GET_SUBREDDIT_BY_NAME, {
    variables: { name: subName }
  })
  const {
    data: postData,
    loading: postLoading,
    error: postError = null
  } = useQuery(GET_POST_BY_ID, {
    variables: { id: postid }
  })

  const subreddit: TSubredditDetail = subData?.subredditByName || svSubreddit
  const postDetail: TPost = postData?.post || svPost
  const loading: boolean = (subLoading || postLoading) && !subreddit && !postDetail
  // zoom image dialog states

  return { subreddit, postDetail, loading, error: subError || postError }
}

export default useSubByNameAndPostById
