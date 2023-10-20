import { useAppSession } from '@/components/Layouts/MainLayout'
import { TPost, TSortOptions } from '@/constants/types'
import { ApolloError } from '@apollo/client'
import orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { v4 as rid } from 'uuid'
import { CardPost, MessageBoard } from '..'
import { validatePostByFollowing, validatePostBySubname } from '../../services'
import { RdSkeletonListItem } from '../Skeletons'

type TUserNewFeedsProps = {
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined | null
  setHasNoPost?: Dispatch<SetStateAction<boolean>>
}

function UserNewFeeds({ sortOptions: { method, ordering }, postList, loading, setHasNoPost }: TUserNewFeedsProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { username: userPageName }
  } = useRouter()

  useEffect(() => {
    setHasNoPost && postList && setHasNoPost(!loading && postList.length === 0)
  }, [postList, loading, setHasNoPost])

  // if post in public subreddit OR user in subreddit => return true
  const verifyPost = (post: TPost): boolean => {
    return validatePostBySubname(me?.member_of_ids, post?.subreddit?.name, post?.subreddit?.subType)
  }

  // if post belongs to my following OR this is my page => return true
  const verifyFollower = (): boolean => {
    return validatePostByFollowing(me?.following_ids, userPageName) || me?.username === userPageName
  }

  /* postList mapping */
  const mappedPostList: TPost[] | null =
    postList &&
    orderBy(
      postList.filter((post): boolean => verifyPost(post)),
      method,
      ordering
    )

  return (
    <>
      {loading || !mappedPostList ? (
        [0, 1].map((el) => (
          <Fragment key={`skeleton_${el}`}>
            <RdSkeletonListItem index={el.toString()} />
          </Fragment>
        ))
      ) : !me?.username ? ( // if user is not logged in
        <MessageBoard head="You need to login to view their content" />
      ) : !verifyFollower() ? ( // if user is not following the user page
        <MessageBoard head="You need to follow " highlight={userPageName as string} tail=" to view their posts" />
      ) : mappedPostList.length > 0 ? (
        mappedPostList.map((post) => <CardPost key={`post_${rid()}`} post={post} />)
      ) : (
        <MessageBoard head="This user has no post" />
      )}
    </>
  )
}

export default UserNewFeeds
