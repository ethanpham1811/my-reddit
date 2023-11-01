import { RdInfiniteScroll } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { QUERY_LIMIT } from '@/constants/enums'
import { TFetchMoreArgs, TPost, TSortOptions } from '@/constants/types'
import { ApolloError } from '@apollo/client'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import orderBy from 'lodash/orderBy'
import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { CardPost, MessageBoard } from '..'
import { validatePostBySubname } from '../../src/utils'
import ZoomImgDialog from '../Cards/CardPost/components/ZoomImgDialog'
import { RdSkeletonListItem } from '../Skeletons'

type TNewFeedsProps = {
  noPostText: string
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined | null
  permissionFailedMsg: ReactNode | false
  appendPosts: (prev: {}, fetchMoreResult: {}) => {}
  fetchMore: FetchMoreFunction<{ [key: string]: TPost[] }, TFetchMoreArgs>
  setHasNoPost: Dispatch<SetStateAction<boolean>>
}

const NewFeeds = ({
  permissionFailedMsg,
  noPostText,
  sortOptions: { method, ordering },
  postList,
  loading,
  fetchMore,
  setHasNoPost,
  appendPosts
}: TNewFeedsProps) => {
  const { session } = useAppSession()
  const me = session?.userDetail

  // zoom image dialog states
  const [zoomedImg, setZoomedImg] = useState<string | null>(null)

  // postList ordering & filtered by user permission
  const mappedPostList: TPost[] | null =
    postList &&
    orderBy(
      postList.filter((post: TPost): boolean => verifyPost(post)),
      method,
      ordering
    )

  /* set message in MainLayout if no post found */
  useEffect(() => {
    !loading && postList && setHasNoPost(postList.length === 0)
  }, [postList, loading, setHasNoPost])

  // if post in public subreddit OR user in subreddit => return true
  function verifyPost(post: TPost): boolean {
    return validatePostBySubname(me?.member_of_ids, post?.subreddit?.name, post?.subreddit?.subType)
  }

  return (
    <>
      {loading || !mappedPostList ? (
        [0, 1].map((el) => (
          <Fragment key={`skeleton_${el}`}>
            <RdSkeletonListItem index={el.toString()} />
          </Fragment>
        ))
      ) : permissionFailedMsg ? (
        permissionFailedMsg
      ) : (
        <>
          {mappedPostList.length > 0 ? (
            <>
              {mappedPostList.map((post) => (
                <CardPost key={`post_${post.id}`} post={post} setZoomedImg={setZoomedImg} />
              ))}
              {/* load more anchor */}
              <RdInfiniteScroll<TPost> appendPosts={appendPosts} fetchMore={fetchMore} limit={QUERY_LIMIT} list={postList} />

              {/* dialog show zoomed image */}
              <ZoomImgDialog zoomDialogOpen={zoomedImg} setZoomDialogOpen={setZoomedImg} />
            </>
          ) : (
            <MessageBoard head={noPostText} />
          )}
        </>
      )}
    </>
  )
}

export default NewFeeds
