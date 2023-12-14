import { TAutocompleteOptions, TQueriedSub, TQueriedUser, TQueryNotFound } from '@/src/constants/types'
import { GET_QUERIED_SUBS_USERS, GET_TOP_TRENDING_POSTS } from '@/src/graphql/queries'
import { ApolloError, useLazyQuery } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SEARCH_DEBOUNCE_TIMER } from '../constants/enums'

type TuseTopSearchQueriedListResponse = {
  dataList: TAutocompleteOptions[]
  loading: boolean
  error: ApolloError | undefined
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

/**
 * This hook handles fetching trending list & top subreddit + users
 * - abort concurrent request before trigger new request
 * - debounce request upon user input by 500ms
 *
 * If SearchTerm is empty (user not input anything):
 * - request for top 3 post with highest votes
 *
 * If SearchTerm has value:
 * - request for 3 subreddits and 3 users (most relevant to search term)
 */
function useTopSearchQueriedList(isFocused: boolean): TuseTopSearchQueriedListResponse {
  const [searchTerm, setSearchTerm] = useState('')
  const notFound: TQueryNotFound[] = [{ groupBy: 'Not Found', text: 'No subreddit or user found.' }]

  /*-------------------------------------- Queries and data mapping --------------------------------------------*/

  // query trending post
  const [queryTrending, { data: trendingData, loading: trendingLoading, error: trendingError }] = useLazyQuery(GET_TOP_TRENDING_POSTS)
  const queriedTrending = trendingData?.queriedTrending

  // query Subs and users list by search term
  const [querySubAndUser, { data: queriedData, loading: queriedLoading, error: subUserError }] = useLazyQuery(GET_QUERIED_SUBS_USERS)
  const queriedSubs: TQueriedSub[] = queriedData?.queriedSubs ?? []
  const queriedUsers: TQueriedUser[] = queriedData?.queriedUsers ?? []

  /*--------------------------------------------- Merge states ---------------------------------------------------*/

  // merge loading & error
  const loading = trendingLoading || queriedLoading
  const error = trendingError || subUserError

  // searchTerm: use Trending posts - Else: use queried sub and users
  const queriedDataList = searchTerm === '' ? queriedTrending || [] : [...queriedSubs, ...queriedUsers]

  // data list empty => show not found
  const dataList = queriedDataList.length == 0 && !loading ? notFound : queriedDataList

  /**
   * fetch queried user and subreddit list on user typing with debounce
   *
   * on receiving new search term
   * - abort the concurrent request
   * - clear debounce elapse timer
   */
  useEffect(() => {
    const abortCtrl = new AbortController()

    const timeout = setTimeout(() => {
      searchTerm !== '' &&
        querySubAndUser({
          variables: { offset: 0, limit: 3, term: searchTerm },
          context: {
            fetchOptions: {
              signal: abortCtrl.signal
            }
          }
        })
    }, SEARCH_DEBOUNCE_TIMER)
    return () => {
      abortCtrl.abort()
      clearTimeout(timeout)
    }
  }, [searchTerm, querySubAndUser])

  /**
   * fetch Top trending post on user first time focus search bar
   */
  useEffect(() => {
    if (!isFocused || trendingData) return
    queryTrending({
      variables: { quantity: 3 }
    })
  }, [isFocused, trendingData, queryTrending])

  return { dataList, loading, error, searchTerm, setSearchTerm }
}
export default useTopSearchQueriedList
