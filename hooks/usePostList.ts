import { client } from '@/apollo-client'
import { TPost } from '@/constants/types'
import { GET_POST_LIST } from '@/graphql/quries'
import { useEffect, useState } from 'react'

function usePostList(): [TPost[] | null, boolean] {
  const [postList, setPostList] = useState<TPost[] | null>(null)
  const loading = !postList

  useEffect(() => {
    ;(async function () {
      const res = await client.query({ query: GET_POST_LIST })
      const list: TPost[] = res?.data?.postList
      setPostList(list)
    })()
  }, [])

  return [postList, loading]
}

export default usePostList
