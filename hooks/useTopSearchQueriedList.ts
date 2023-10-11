import { TAutocompleteOptions, TQueriedSub, TQueriedTrending, TQueriedUser, TQueryNotFound } from '@/constants/types'
import { GET_QUERIED_SUBS_USERS, GET_TOP_TRENDING_POSTS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TuseTopSearchQueriedListResponse = {
  queriedDataList: TAutocompleteOptions[]
  loading: boolean
  error: ApolloError | undefined
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

function useTopSearchQueriedList(): TuseTopSearchQueriedListResponse {
  const [searchTerm, setSearchTerm] = useState('')
  const notFound: TQueryNotFound[] = [{ groupBy: 'Not Found', text: 'Nothing found.' }]

  // Trending posts for default list
  const { data: trendingData, loading: trendingLoading, error: trendingError } = useQuery(GET_TOP_TRENDING_POSTS, { variables: { quantity: 3 } })
  const topTrendingData: TQueriedTrending[] = trendingData?.queriedTrending ?? []

  // Subs and users for queried list
  const {
    data: queriedData,
    loading: queriedLoading,
    error,
    refetch
  } = useQuery(GET_QUERIED_SUBS_USERS, { skip: searchTerm === '', variables: { quantity: 3, term: searchTerm } })
  const queriedSubs: TQueriedSub[] = queriedData?.queriedSubs ?? []
  const queriedUsers: TQueriedUser[] = queriedData?.queriedUsers ?? []

  // use Trending posts for default list if searchTerm is empty
  const queriedDataList = searchTerm === '' ? topTrendingData : [...queriedSubs, ...queriedUsers]
  const loading = trendingLoading || queriedLoading

  useEffect(() => {
    refetch()
  }, [searchTerm, refetch])

  return { queriedDataList: queriedDataList.length == 0 && !loading ? notFound : queriedDataList, loading, error, searchTerm, setSearchTerm }
}
export default useTopSearchQueriedList
