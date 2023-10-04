import { TTopic, TUseTopicListResponse } from '@/constants/types'
import { GET_TOPIC_LIST } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

function useTopicList(): TUseTopicListResponse {
  const { data, loading, error } = useQuery(GET_TOPIC_LIST)
  const topicList: TTopic[] = data?.topicList

  return { topicList, loading, error }
}

export default useTopicList
