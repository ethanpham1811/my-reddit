import { TPost, TSubredditDetail } from '@/src/constants/types'
import { GET_POST_BY_ID, GET_SUBREDDIT_BY_NAME } from '@/src/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

type TUseSubByNameAndPostByIdResponse = {
  subreddit: TSubredditDetail | null
  postDetail: TPost | null
  loading: boolean
  error: ApolloError | null
}

/**
 * Currently using 2 separated api for this hook
 * because of the unexpected issue with apollo optimistic and cache update
 * TODO: will be fixed later
 */
function useSubByNameAndPostById(svSubreddit?: TSubredditDetail | null, svPost?: TPost | null): TUseSubByNameAndPostByIdResponse {
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

  return { subreddit, postDetail, loading, error: subError || postError }
}

export default useSubByNameAndPostById
