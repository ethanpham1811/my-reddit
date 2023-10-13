import { SEARCH_TABS } from '@/constants/enums'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { TQueriedPost, TQueriedSub, TQueriedUser, TUserDetail } from '@/constants/types'

import { SearchFeeds, SearchFeedsTabBar } from '@/components'
import CardSearchSide from '@/components/Cards/CardSearchSide/CardSearchSide'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { AppContext } from '@/components/Layouts/MainLayout'
import { UPDATE_USER } from '@/graphql/mutations'
import useSearchQueriedList from '@/hooks/useSearchQueriedList'
import useUserByUsername from '@/hooks/useUserByUsername'
import { useMutation } from '@apollo/client'
import { Container, Stack } from '@mui/material'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
const Search: NextPage = () => {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  // const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { q, type }
  } = useRouter()
  const searchTerm = q ?? ''
  const [queriedPosts, queriedSubs, queriedUsers, loading, error] = useSearchQueriedList(searchTerm)
  const [hasNoPost, setHasNoPost] = useState(false)
  const [mutateUser] = useMutation(UPDATE_USER)

  let searchList: TQueriedPost[] | TQueriedSub[] | TQueriedUser[] = []
  if (type === SEARCH_TABS.Post || !type) searchList = queriedPosts
  if (type === SEARCH_TABS.Communities) searchList = queriedSubs
  if (type === SEARCH_TABS.People) searchList = queriedUsers

  async function updateUser(field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, isAdding: boolean) {
    if (me == null || me[field] == null) return
    const updateObj = { [field]: isAdding ? [...(me[field] as []), name] : (me[field] as []).filter((item: string) => item !== name) }

    const { data, errors } = await mutateUser({
      variables: {
        id: me.id,
        ...updateObj
      }
    })
    if (errors) errors.forEach((error) => toast.error(error.message))
  }

  return (
    <div>
      <Head>
        <title>Search reddit</title>
      </Head>
      <Container maxWidth="md">
        <SearchFeedsTabBar top="70px" type={type as SEARCH_TABS | undefined} />
      </Container>
      <FeedLayout top="1rem" single={type === SEARCH_TABS.Communities || type === SEARCH_TABS.People}>
        <Stack spacing={2}>
          {/* sortOptions={sortOptions}*/}
          <SearchFeeds
            updateUser={updateUser}
            searchTerm={searchTerm as string}
            searchList={searchList}
            loading={loading}
            setHasNoPost={setHasNoPost}
          />
        </Stack>
        <Stack spacing={2}>
          <CardSearchSide<TQueriedSub>
            updateUser={updateUser}
            loading={loading}
            list={queriedSubs}
            title={'Communities'}
            q={searchTerm as string}
            type={SEARCH_TABS.Communities}
          />
          <CardSearchSide<TQueriedUser>
            updateUser={updateUser}
            loading={loading}
            list={queriedUsers}
            title={'People'}
            q={searchTerm as string}
            type={SEARCH_TABS.People}
          />
        </Stack>
      </FeedLayout>
    </div>
  )
}

export default Search
