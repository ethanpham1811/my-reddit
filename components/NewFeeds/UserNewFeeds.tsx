import { TCardPostProps, TPost, TSortOptions } from '@/constants/types'
import useUserByUsername from '@/hooks/useUserByUsername'
import { ApolloError } from '@apollo/client'
import { Skeleton, Stack } from '@mui/material'
import orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { v4 as rid } from 'uuid'
import { CardPost, MessageBoard } from '..'
import { getTotalUpvote, validatePostByFollowing, validatePostBySubname } from '../../services'
import { AppContext } from '../Layouts/MainLayout'

type TUserNewFeedsProps = {
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined
  setHasNoPost?: Dispatch<SetStateAction<boolean>>
}

function UserNewFeeds({ sortOptions: { method, ordering }, postList, loading, setHasNoPost }: TUserNewFeedsProps) {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  const {
    query: { username: userPageName }
  } = useRouter()

  useEffect(() => {
    setHasNoPost && postList && setHasNoPost(!loading && postList.length === 0)
  }, [postList, loading, setHasNoPost])

  // weather if the post belongs to the subreddit that I've join
  const verifyPost = (post: TPost): boolean => {
    return validatePostBySubname(me?.member_of_ids, post?.subreddit?.name, post?.subreddit?.subType)
  }

  // weather if the post belongs to user that I'm following
  const verifyFollower = (): boolean => {
    return validatePostByFollowing(me?.following_ids, userPageName) || me?.username === userPageName
  }

  /* postList mapping */
  const mappedPostList: TCardPostProps[] | null =
    postList &&
    orderBy(
      postList
        .filter((post): boolean => verifyPost(post))
        .map(({ id, title, body, images, comment, created_at, user: { username }, subreddit, vote }: TPost): TCardPostProps => {
          return {
            id,
            title,
            body,
            comment,
            username,
            createdAt: new Date(created_at),
            subName: subreddit.name,
            images,
            upvote: vote ? getTotalUpvote(vote) : 0
          }
        }),
      method,
      ordering
    )

  return (
    <>
      {loading || !mappedPostList ? (
        [0, 1].map((el) => (
          <Stack height={400} py={2} gap={1} key={`loading_ske_${el}`}>
            <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="60%" height="25px" />
            <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="80%" height="12px" />
            <Skeleton sx={{ display: 'flex', flex: 1 }} variant="rectangular" width="100%" />
            <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="30%" height="12px" />
          </Stack>
        ))
      ) : !userName ? ( // if this is USER PAGE and user is not logged in
        <MessageBoard head="You need to login to view their content" />
      ) : !verifyFollower() ? ( // if this is USER PAGE and user is not logged in
        <MessageBoard head="You need to follow " highlight={userPageName as string} tail=" to view their posts" />
      ) : mappedPostList.length > 0 ? (
        mappedPostList.map(({ id, title, body, images, comment, createdAt, username, subName, upvote }) => {
          return (
            <CardPost
              id={id}
              key={`post_${rid()}`}
              images={images}
              title={title}
              body={body}
              createdAt={createdAt}
              upvote={upvote}
              subName={subName}
              username={username}
              comment={comment}
            />
          )
        })
      ) : (
        <MessageBoard head="This user has no post" />
      )}
    </>
  )
}

export default UserNewFeeds
