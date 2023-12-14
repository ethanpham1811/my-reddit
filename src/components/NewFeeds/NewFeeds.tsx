import { useAppSession } from '@/src/Layouts/MainLayout'
import { CardFeedSorter, RdInfiniteScroll } from '@/src/components'
import { ORDERING, QUERY_LIMIT, SORT_METHOD } from '@/src/constants/enums'
import { TFetchMoreArgs, TPost, TSortOptions } from '@/src/constants/types'
import { validatePostBySubname } from '@/src/services/utils'
import { ApolloError } from '@apollo/client'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import orderBy from 'lodash.orderby'
import { Fragment, ReactNode, useMemo, useState } from 'react'
import { CardPost, RdMessageBoard } from '..'
import ZoomImgDialog from '../Cards/CardPost/components/ZoomImgDialog'
import { RdSkeletonListItem } from '../Skeletons'

type TNewFeedsProps = {
  noPostText: string
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined | null
  permissionFailedMsg: ReactNode | false
  appendPosts: (prev: {}, fetchMoreResult: {}) => {}
  fetchMore: FetchMoreFunction<{ [key: string]: TPost[] }, TFetchMoreArgs>
}

const NewFeeds = ({ permissionFailedMsg, noPostText, postList, loading, fetchMore, appendPosts }: TNewFeedsProps) => {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })

  // postList ordering & filtered by user permission
  const mappedPostList: TPost[] | null = useMemo(() => {
    return (
      postList &&
      orderBy(
        postList.filter((post) => validatePostBySubname(me?.member_of_ids, post?.subreddit?.name, post?.subreddit?.subType)),
        sortOptions.method,
        sortOptions.ordering
      )
    )
  }, [postList, sortOptions, me?.member_of_ids])

  // return loader on loading
  if (loading || !mappedPostList) {
    return [0].map((el) => (
      <Fragment key={`skeleton_${el}`}>
        <RdSkeletonListItem index={el.toString()} />
      </Fragment>
    ))
  }

  // return message on unauthorized access
  if (permissionFailedMsg) return permissionFailedMsg

  // return no post message on empty post list
  if (!mappedPostList || mappedPostList.length === 0) return <RdMessageBoard head={noPostText} hasBackground />

  return (
    <>
      <CardFeedSorter sortOptions={sortOptions} setSortOptions={setSortOptions} />

      {mappedPostList.map((post) => (
        <CardPost key={`post_${post.id}`} post={post} />
      ))}

      {/* load more anchor */}
      <RdInfiniteScroll<TPost> appendPosts={appendPosts} fetchMore={fetchMore} limit={QUERY_LIMIT} list={postList} />

      {/* dialog show zoomed image */}
      <ZoomImgDialog />
    </>
  )
}

export default NewFeeds
