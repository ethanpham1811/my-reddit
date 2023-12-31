import FeedLayout from '@/src/Layouts/FeedLayout'
import { useAppSession } from '@/src/Layouts/MainLayout'
import { SearchFeeds, SearchFeedsTabBar } from '@/src/components'
import CardSearchSide from '@/src/components/Cards/CardSearchSide/CardSearchSide'
import { NON_SUB_FEED_LAYOUT_TOP_OFFSET, SEARCH_TABS } from '@/src/constants/enums'
import { TQueriedList, TQueriedSub, TQueriedUser, TUserDetail } from '@/src/constants/types'
import { useSearchQueriedList, useUserUpdate } from '@/src/hooks'
import { Container, Stack } from '@/src/mui'
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

  /**
   * Handle update user:
   * - "member_of_ids": join/leave subreddit
   * - "following_ids": follow/unfollow user
   */
  async function handleUpdateUser(field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, isAdding: boolean) {
    if (me == null || me[field] == null) return
    updateUser(field, name, isAdding)
  }

  return (
    <>
      <Head>
        <title>Search reddit</title>
      </Head>
      <Container maxWidth="md">
        <SearchFeedsTabBar top={NON_SUB_FEED_LAYOUT_TOP_OFFSET} type={type as SEARCH_TABS | undefined} />
      </Container>
      <FeedLayout ignoreLayoutLoading top="1rem" single={type === SEARCH_TABS.Communities || type === SEARCH_TABS.People}>
        {/* main tab content */}
        <Stack spacing={2}>
          <SearchFeeds type={type} updateUser={handleUpdateUser} searchTerm={searchTerm as string} searchList={searchList} loading={loading} />
        </Stack>

        {/* Community & people right side cards: only available on Post tab */}
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row', md: 'column' }}>
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
    </>
  )
}

export default Search
