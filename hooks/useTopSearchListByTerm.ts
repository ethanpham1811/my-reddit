import { TQueriedSub, TQueriedUser } from '@/constants/types'
import { GET_QUERIED_SUBS_USERS } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TuseTopSearchListByTermResponse = {
  searchByTermData: (TQueriedSub | TQueriedUser)[]
  loading: boolean
  error: ApolloError | undefined
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

function useTopSearchListByTerm(): TuseTopSearchListByTermResponse {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, loading, error, refetch } = useQuery(GET_QUERIED_SUBS_USERS, { variables: { quantity: 3, term: searchTerm } })
  const queriedSubs: TQueriedSub[] = data?.queriedSubs ?? []
  const queriedUsers: TQueriedUser[] = data?.queriedUsers ?? []

  const searchByTermData = [...queriedSubs, ...queriedUsers]

  useEffect(() => {
    refetch()
    //TODO: abort controller
  }, [searchTerm, refetch])

  return { searchByTermData, loading, error, searchTerm, setSearchTerm }
}

export default useTopSearchListByTerm
