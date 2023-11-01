import { TTopic } from '@/constants/types'
import { GET_TOPIC_LIST } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'

type TUseTopicListResponse = {
  topicList: TTopic[] | null
  loading: boolean
  error: ApolloError | undefined
}

function useTopicList(): TUseTopicListResponse {
  const { data, loading, error } = useQuery(GET_TOPIC_LIST)
  const topicList: TTopic[] = data?.topicList

  return { topicList, loading, error }
}

export default useTopicList
