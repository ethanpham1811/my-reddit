import { useAppSession } from '@/components/Layouts/MainLayout'
import { SEARCH_TABS } from '@/constants/enums'
import { TQueriedPost, TQueriedSub, TQueriedUser, TSearchOptions, TUserDetail } from '@/constants/types'
import { isSearchQueriedPost, isSearchQueriedSub, isSearchQueriedUser } from '@/src/typeCheck'
import { validatePostByFollowing, validateSubredditMember } from '@/src/utils'
import { Box } from '@mui/material'
import { Jelly } from '@uiball/loaders'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { RdCard } from '..'
import { NotFound } from '../Cards/CardNotFound/CardNotFound'
import SearchPostItem from './components/SearchPostItem'
import SearchSubUserItem from './components/SearchSubUserItem'

type TSearchFeedsProps = {
  // sortOptions: TSortOptions
  searchList: TQueriedPost[] | TQueriedSub[] | TQueriedUser[]
  searchTerm: string
  loading: boolean
  updateLoading: boolean
  setHasNoPost?: Dispatch<SetStateAction<boolean>>
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
}

function SearchFeeds({ searchList, updateLoading, loading, setHasNoPost, searchTerm, updateUser }: TSearchFeedsProps) {
  const { session } = useAppSession()
  const me = session?.userDetail

  useEffect(() => {
    setHasNoPost && searchList && setHasNoPost(!loading && searchList.length === 0)
  }, [searchList, loading, setHasNoPost])

  function renderListItem(item: TSearchOptions) {
    if (isSearchQueriedPost(item)) return <SearchPostItem key={`search_post_item_${item.id}`} item={item} />
    if (isSearchQueriedSub(item)) {
      const status = me ? validateSubredditMember(me?.member_of_ids, item.name) : false
      return (
        <SearchSubUserItem
          key={`search_post_item_${item.id}`}
          loading={updateLoading}
          item={item}
          updateUser={updateUser}
          revertBtnText={status ? 'Leave' : 'Join'}
          type={SEARCH_TABS.Communities}
        />
      )
    }
    if (isSearchQueriedUser(item)) {
      const status = me ? validatePostByFollowing(me?.following_ids, item.username) : false
      return (
        <SearchSubUserItem
          loading={updateLoading}
          item={item}
          updateUser={updateUser}
          revertBtnText={status ? 'Unfollow' : 'Follow'}
          type={SEARCH_TABS.People}
        />
      )
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
        <RdCard sx={{ p: 0 }}>{searchList.map((item) => renderListItem(item))}</RdCard>
      ) : (
        <NotFound searchTerm={searchTerm} />
      )}
    </>
  )
}

export default SearchFeeds
