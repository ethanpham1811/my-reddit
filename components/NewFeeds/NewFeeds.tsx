import { useAppSession } from '@/components/Layouts/MainLayout'
import { SUBREDDIT_TYPE } from '@/constants/enums'
import { TPost, TSortOptions } from '@/constants/types'
import { ApolloError } from '@apollo/client'
import orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { v4 as rid } from 'uuid'
import { CardPost, MessageBoard } from '..'
import { validatePostBySubname, validateSubredditMember } from '../../services'
import { RdSkeletonListItem } from '../Skeletons'

type TNewFeedsProps = {
  subType?: SUBREDDIT_TYPE | undefined
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined | null
  setHasNoPost?: Dispatch<SetStateAction<boolean>>
}

function NewFeeds({ sortOptions: { method, ordering }, postList, loading, subType, setHasNoPost }: TNewFeedsProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subPageName }
  } = useRouter()

  useEffect(() => {
    setHasNoPost && postList && setHasNoPost(!loading && postList.length === 0)
  }, [postList, loading, setHasNoPost])

  // weather if the post belongs to the public subreddit
  const verifyIsMember = (): boolean => {
    return validateSubredditMember(me?.member_of_ids, subPageName)
  }

  // if post in public subreddit OR user in subreddit => return true
  const verifyPost = (post: TPost): boolean => {
    return validatePostBySubname(me?.member_of_ids, post?.subreddit?.name, post.subreddit.subType)
  }

  /* postList mapping */
  const cardPostList: TPost[] | null =
    postList &&
    orderBy(
      postList.filter((post): boolean => verifyPost(post)),
      method,
      ordering
    )

  return (
    <>
      {loading || !cardPostList ? (
        [0, 1].map((el) => (
          <Fragment key={`skeleton_${el}`}>
            <RdSkeletonListItem index={el.toString()} />
          </Fragment>
        ))
      ) : // ON SUBREDDIT FEEDS: check weather if I haven't join this subreddit or this subreddit is not public
      subPageName && !verifyIsMember() && subType !== SUBREDDIT_TYPE.Public ? (
        <MessageBoard head="This community is private, please join " highlight={subPageName as string} />
      ) : cardPostList.length > 0 ? (
        cardPostList.map((post) => {
          return <CardPost post={post} key={`post_${rid()}`} inGroup={!!subPageName} />
        })
      ) : (
        <MessageBoard head={subPageName ? 'This Subreddit has no post' : 'Something wrong with the server, please come back again'} />
      )}
    </>
  )
}

export default NewFeeds
