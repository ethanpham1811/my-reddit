import { TPopularSub, TTopTrending } from '@/constants/types'
import { GET_TOP_TRENDING_POSTS_AND_SUBS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TUseTopSearchListResponse = {
  topTrendingData: (TTopTrending | TPopularSub)[]
  loading: boolean
  error: ApolloError | undefined
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

function useTopSearchList(): TUseTopSearchListResponse {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, loading, error, refetch } = useQuery(GET_TOP_TRENDING_POSTS_AND_SUBS, { variables: { quantity: 3 } })
  const topTrending: TTopTrending[] = data?.topTrending ?? []
  const topSubreddits: TPopularSub[] = data?.topSubreddits ?? []

  const topTrendingData = [...topTrending, ...topSubreddits]

  useEffect(() => {
    refetch()
    //TODO: abort controller
  }, [searchTerm, refetch])

  return { topTrendingData, loading, error, searchTerm, setSearchTerm }
}

export default useTopSearchList
