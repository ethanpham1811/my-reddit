import { useAppSession } from '@/components/Layouts/MainLayout'
import { SEARCH_TABS } from '@/constants/enums'
import { TFetchMoreArgs, TQueriedPost, TQueriedResult, TQueriedSub, TQueriedUser, TSearchOptions, TUserDetail } from '@/constants/types'
import { isSearchQueriedPost, isSearchQueriedSub, isSearchQueriedUser } from '@/src/typeCheck'
import { validatePostByFollowing, validateSubredditMember } from '@/src/utils'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import { Box } from '@mui/material'
import { Jelly } from '@uiball/loaders'
import { RdCard } from '..'
import { NotFound } from '../Cards/CardNotFound/CardNotFound'
import SearchPostItem from './components/SearchPostItem'
import SearchSubUserItem from './components/SearchSubUserItem'

type TSearchFeedsProps = {
  searchList: TQueriedPost[] | TQueriedSub[] | TQueriedUser[]
  searchTerm: string
  loading: boolean
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
  fetchMore: FetchMoreFunction<{ [key: string]: TQueriedResult }, TFetchMoreArgs>
}

function SearchFeeds({ searchList, loading, searchTerm, updateUser, fetchMore }: TSearchFeedsProps) {
  const { session } = useAppSession()
  const me = session?.userDetail

  function renderListItem(item: TSearchOptions) {
    // Top trending tab
    if (isSearchQueriedPost(item)) {
      return <SearchPostItem key={`search_post_item_${item.id}`} item={item} />
    }

    // Queried Community tab
    if (isSearchQueriedSub(item)) {
      const status = me ? validateSubredditMember(me?.member_of_ids, item.name) : false
      return (
        <SearchSubUserItem
          key={`search_post_item_${item.id}`}
          item={item}
          updateUser={updateUser}
          revertBtnText={status ? 'Leave' : 'Join'}
          type={SEARCH_TABS.Communities}
        />
      )
    }

    // Queried People tab
    if (isSearchQueriedUser(item)) {
      const status = me ? validatePostByFollowing(me?.following_ids, item.username) : false
      return <SearchSubUserItem item={item} updateUser={updateUser} revertBtnText={status ? 'Unfollow' : 'Follow'} type={SEARCH_TABS.People} />
    }
    return <div></div>
  }

  return (
    <>
      {loading || !searchList ? (
        <Box display="flex" justifyContent="center" py={4}>
          <Jelly size={40} speed={0.7} color="#ff4500" />
        </Box>
      ) : searchList.length > 0 ? (
        <RdCard sx={{ p: 0 }}>
          {searchList.map((item) => renderListItem(item))}

          {/* load more anchor
          <RdInfiniteScroll<TQueriedResult> appendPosts={appendPosts} fetchMore={fetchMore} limit={QUERY_LIMIT} list={searchList} /> */}
        </RdCard>
      ) : (
        <NotFound searchTerm={searchTerm} />
      )}
    </>
  )
}

export default SearchFeeds
