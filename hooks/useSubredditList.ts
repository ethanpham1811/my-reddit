import { client } from '@/apollo-client'
import { TSubreddit } from '@/constants/types'
import { GET_SUBREDDIT_LIST } from '@/graphql/quries'
import { useEffect, useState } from 'react'

function useSubredditList(): [TSubreddit[] | null, boolean] {
  const [subredditList, setSubredditList] = useState<TSubreddit[] | null>(null)
  const loading = !subredditList

  useEffect(() => {
    ;(async function () {
      const res = await client.query({ query: GET_SUBREDDIT_LIST })
      const list: TSubreddit[] = res?.data?.subredditList
      setSubredditList(list)
    })()
  }, [])

  return [subredditList, loading]
}

export default useSubredditList
