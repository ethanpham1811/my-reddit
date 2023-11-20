import { useAppSession } from '@/src/Layouts/MainLayout'
import { QUERY_LIMIT, SEARCH_TABS } from '@/src/constants/enums'
import { TQueriedList, TQueriedPost, TQueriedSub, TQueriedUser, TSearchOptions, TUserDetail } from '@/src/constants/types'
import { isSearchQueriedPost } from '@/src/services/typeCheck'
import { RdCard } from '..'
import { NotFound } from '../Cards/CardNotFound/CardNotFound'
import CardSearchItem from '../Cards/CardSearchSide/CardSearchItem'
import { RdSearchPeopleSubSkeleton, RdSearchPostSkeleton } from '../Skeletons'
import RdPaginator from '../utilities/RdPaginator/RdPaginator'
import SearchPostItem from './components/SearchPostItem'
import { getFields } from './utils'

type TSearchFeedsProps = {
  searchList: TQueriedPost[] | TQueriedSub[] | TQueriedUser[]
  searchTerm: string
  loading: boolean
  type: string | string[] | undefined
  updateUser: (field: keyof Pick<TUserDetail, 'member_of_ids' | 'following_ids'>, name: string, status: boolean) => void
}

function SearchFeeds({ searchList, type, loading, searchTerm, updateUser }: TSearchFeedsProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const totalItems: number = searchList[0]?.totalItems || 0

  function renderListItem(item: TSearchOptions) {
    // Top trending tab
    if (isSearchQueriedPost(item)) {
      return <SearchPostItem key={`search_post_item_${item.id}`} item={item} />
    }
    // Queried Community tab
    else {
      const { name, status, btnText, extraText, link, revertBtnText, ownerUsername, type } = getFields(me, item)

      return (
        <CardSearchItem
          flex={1}
          name={name}
          status={status}
          btnText={btnText}
          extraText={extraText}
          link={link}
          revertBtnText={revertBtnText}
          ownerUsername={ownerUsername}
          type={type}
          updateUser={updateUser}
          key={`search_post_item_${item.id}`}
        />
      )
    }
  }

  return (
    <>
      {loading || !searchList ? (
        type === SEARCH_TABS.Post || !type ? (
          RdSearchPostSkeleton(QUERY_LIMIT)
        ) : (
          RdSearchPeopleSubSkeleton(QUERY_LIMIT)
        )
      ) : searchList.length > 0 ? (
        <>
          <RdCard sx={{ p: 0 }}>{searchList.map((item) => renderListItem(item))}</RdCard>

          {/* paginator */}
          <RdPaginator<TQueriedList> totalItems={totalItems} />
        </>
      ) : (
        <NotFound searchTerm={searchTerm} />
      )}
    </>
  )
}

export default SearchFeeds
