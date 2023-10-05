import { TSubreddit } from '@/constants/types'
import { GET_SUBREDDIT_LIST_SHORT } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TUseTopSearchListResponse = {
  queryList: TSubreddit[]
  loading: boolean
  error: ApolloError | undefined
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

function useTopSearchList(): TUseTopSearchListResponse {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, loading, error, refetch } = useQuery(GET_SUBREDDIT_LIST_SHORT)
  const queryList: TSubreddit[] = data?.subredditList ?? []

  useEffect(() => {
    refetch()
    //TODO: abort controller
  }, [searchTerm, refetch])

  return { queryList, loading, error, searchTerm, setSearchTerm }
}

export default useTopSearchList
