import { TQueriedTrending } from '@/constants/types'
import { GET_TOP_TRENDING_POSTS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TuseTopSearchListDefaultResponse = {
  topTrendingData: TQueriedTrending[]
  loading: boolean
  error: ApolloError | undefined
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

function useTopSearchListDefault(): TuseTopSearchListDefaultResponse {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, loading, error, refetch } = useQuery(GET_TOP_TRENDING_POSTS, { variables: { quantity: 3 } })
  const topTrendingData: TQueriedTrending[] = data?.queriedTrending ?? []

  useEffect(() => {
    refetch()
    //TODO: abort controller
  }, [searchTerm, refetch])

  return { topTrendingData, loading, error, searchTerm, setSearchTerm }
}

export default useTopSearchListDefault
