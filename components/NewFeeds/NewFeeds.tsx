import { TFetchMoreArgs, TSortOptions } from '@/constants/types'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { TPost } from '@/constants/types'
import orderBy from 'lodash/orderBy'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { validatePostBySubname } from '../../services'

import { RdInfiniteScroll } from '@/components'
import { QUERY_LIMIT } from '@/constants/enums'
import { ApolloError } from '@apollo/client'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import { Fragment } from 'react'
import { CardPost, MessageBoard } from '..'
import ZoomImgDialog from '../Cards/CardPost/components/ZoomImgDialog'
import { RdSkeletonListItem } from '../Skeletons'

export type TNewFeedsProps = {
  noPostText: string
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined | null
  permissionFailedMsg: ReactNode | false
  fetchMoreUpdateReturn: (prev: {}, fetchMoreResult: {}) => {}
  fetchMore: FetchMoreFunction<{ [key: string]: TPost[] }, TFetchMoreArgs>
  setHasNoPost: Dispatch<SetStateAction<boolean>>
}

const NewFeeds = ({
  permissionFailedMsg,
  noPostText,
  sortOptions: { method, ordering },
  postList,
  fetchMore,
  loading,
  setHasNoPost,
  fetchMoreUpdateReturn
}: TNewFeedsProps) => {
  const { session } = useAppSession()
  const me = session?.userDetail

  // zoom image dialog states
  const [zoomedImg, setZoomedImg] = useState<string | null>(null)

  // postList mapping
  const mappedPostList: TPost[] | null =
    postList &&
    orderBy(
      postList.filter((post: TPost): boolean => verifyPost(post)),
      method,
      ordering
    )

  /* set message in MainLayout if no post found */
  !loading && postList && setHasNoPost(postList.length === 0)

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
              <RdInfiniteScroll<TPost> fetchMoreUpdateReturn={fetchMoreUpdateReturn} fetchMore={fetchMore} limit={QUERY_LIMIT} list={postList} />

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
