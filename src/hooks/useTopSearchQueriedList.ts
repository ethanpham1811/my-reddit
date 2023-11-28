import { TAutocompleteOptions, TQueriedSub, TQueriedTrending, TQueriedUser, TQueryNotFound } from '@/src/constants/types'
import { GET_QUERIED_SUBS_USERS, GET_TOP_TRENDING_POSTS } from '@/src/graphql/queries'
import { client } from '@/src/services/apollo-client'
import { ApolloError, useQuery } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TuseTopSearchQueriedListResponse = {
  dataList: TAutocompleteOptions[]
  loading: boolean
  error: ApolloError | undefined
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

/**
 * If SearchTerm is empty (user not input anything):
 * - request for top 3 post with highest votes
 *
 * If SearchTerm has value:
 * - request for 3 subreddits and 3 users (most relevant to search term)
 */
function useTopSearchQueriedList(isFocused: boolean): TuseTopSearchQueriedListResponse {
  const [searchTerm, setSearchTerm] = useState('')
  const [trendingLoading, setTrendingLoading] = useState(false)
  const [trendingData, setTrendingData] = useState<TQueriedTrending[] | null>(null)
  const notFound: TQueryNotFound[] = [{ groupBy: 'Not Found', text: 'Nothing found.' }]

  // query Subs and users list by search term
  const {
    data: queriedData,
    loading: queriedLoading,
    error,
    refetch
  } = useQuery(GET_QUERIED_SUBS_USERS, { skip: searchTerm === '', variables: { offset: 0, limit: 3, term: searchTerm } })
  const queriedSubs: TQueriedSub[] = queriedData?.queriedSubs ?? []
  const queriedUsers: TQueriedUser[] = queriedData?.queriedUsers ?? []

  // use Trending posts for default list if searchTerm is ''
  const loading = trendingLoading || queriedLoading
  const queriedDataList = searchTerm === '' ? trendingData || [] : [...queriedSubs, ...queriedUsers]
  const dataList = queriedDataList.length == 0 && !loading ? notFound : queriedDataList

  // fetch queried user and subreddit list on user typing
  useEffect(() => {
    searchTerm !== '' && refetch()
  }, [searchTerm, refetch])

  // fetch Top trending post on user first time focus search bar
  useEffect(() => {
    if (!isFocused || trendingData) return
    setTrendingLoading(true)

    const fetchTopTrending = async () => {
      const { data, error } = await client.query({ query: GET_TOP_TRENDING_POSTS, variables: { quantity: 3 } })
      setTrendingLoading(false)
      if (error) return
      setTrendingData(data?.queriedTrending)
    }
    fetchTopTrending()
  }, [isFocused, setTrendingData, trendingData])

  return { dataList, loading, error, searchTerm, setSearchTerm }
}
export default useTopSearchQueriedList
