import { SearchFeeds, SearchFeedsTabBar } from '@/components'
import CardSearchSide from '@/components/Cards/CardSearchSide/CardSearchSide'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { SEARCH_TABS } from '@/constants/enums'
import { TQueriedList, TQueriedSub, TQueriedUser, TUserDetail } from '@/constants/types'
import useSearchQueriedList from '@/hooks/useSearchQueriedList'
import useUserUpdate from '@/hooks/useUserUpdate'
import { Container, Stack } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Search: NextPage = () => {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { q, type }
  } = useRouter()
  const searchTerm = q ?? ''
  const { queriedPosts, queriedSubs, queriedUsers, loading } = useSearchQueriedList(searchTerm)
  const { updateUser } = useUserUpdate()

  let searchList: TQueriedList = []
  if (type === SEARCH_TABS.Post || !type) searchList = queriedPosts
  if (type === SEARCH_TABS.Communities) searchList = queriedSubs
  if (type === SEARCH_TABS.People) searchList = queriedUsers

  async function handleUpdateUser(field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, isAdding: boolean) {
    if (me == null || me[field] == null) return
    updateUser(field, name, isAdding)
  }

  return (
    <div>
      <Head>
        <title>Search reddit</title>
      </Head>
      <Container maxWidth="md">
        <SearchFeedsTabBar top="70px" type={type as SEARCH_TABS | undefined} />
      </Container>
      <FeedLayout loading={loading} top="1rem" single={type === SEARCH_TABS.Communities || type === SEARCH_TABS.People}>
        {/* main tab content */}
        <Stack spacing={2}>
          <SearchFeeds updateUser={handleUpdateUser} searchTerm={searchTerm as string} searchList={searchList} loading={loading} />
        </Stack>

        {/* Community & people right side cards: only available on Post tab */}
        <Stack spacing={2}>
          <CardSearchSide<TQueriedSub>
            updateUser={handleUpdateUser}
            loading={loading}
            list={queriedSubs}
            title={'Communities'}
            q={searchTerm as string}
            type={SEARCH_TABS.Communities}
          />
          <CardSearchSide<TQueriedUser>
            updateUser={handleUpdateUser}
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
