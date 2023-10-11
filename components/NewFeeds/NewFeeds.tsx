import { SUBREDDIT_TYPE } from '@/constants/enums'
import { TCardPostProps, TPost, TSortOptions } from '@/constants/types'
import useUserByUsername from '@/hooks/useUserByUsername'
import { ApolloError } from '@apollo/client'
import { Skeleton, Stack } from '@mui/material'
import orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useContext } from 'react'
import { v4 as rid } from 'uuid'
import { CardPost, MessageBoard } from '..'
import { getTotalUpvote, validatePostBySubname, validateSubredditMember } from '../../services'
import { AppContext } from '../Layouts/MainLayout'

type TNewFeedsProps = {
  subType?: SUBREDDIT_TYPE | undefined
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError | undefined
  setHasNoPost?: Dispatch<SetStateAction<boolean>>
}

function NewFeeds({ sortOptions: { method, ordering }, postList, loading, subType, setHasNoPost }: TNewFeedsProps) {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  const {
    query: { subreddit: subPageName }
  } = useRouter()
  setHasNoPost && postList && setHasNoPost(!loading && postList.length === 0)

  // weather if the post belongs to the public subreddit
  const verifyIsMember = (): boolean => {
    return validateSubredditMember(me?.member_of_ids, subPageName)
  }

  // weather if the post belongs to the public subreddit
  const verifyPost = (post: TPost): boolean => {
    return validatePostBySubname(me?.member_of_ids, post?.subreddit?.name, subType)
  }

  /* postList mapping */
  const cardPostList: TCardPostProps[] | null =
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
            subreddit: subreddit.name,
            images,
            upvote: vote ? getTotalUpvote(vote) : 0
          }
        }),
      method,
      ordering
    )

  return (
    <>
      {loading || !cardPostList ? (
        [0, 1].map((el) => (
          <Stack height={400} py={2} gap={1} key={`loading_ske_${el}`}>
            <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="60%" height="25px" />
            <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="80%" height="12px" />
            <Skeleton sx={{ display: 'flex', flex: 1 }} variant="rectangular" width="100%" />
            <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="30%" height="12px" />
          </Stack>
        ))
      ) : // ON SUBREDDIT FEEDS: check weather if I haven't join this subreddit or this subreddit is not public
      subPageName && !verifyIsMember() && subType !== SUBREDDIT_TYPE.Public ? (
        <MessageBoard message="This community is private, please Join" />
      ) : cardPostList.length > 0 ? (
        cardPostList.map(({ id, title, body, images, comment, createdAt, username, subreddit, upvote }) => {
          return (
            <CardPost
              id={id}
              key={`post_${rid()}`}
              images={images}
              title={title}
              body={body}
              createdAt={createdAt}
              upvote={upvote}
              subreddit={subreddit}
              username={username}
              comment={comment}
              inGroup={!!subPageName}
            />
          )
        })
      ) : (
        <MessageBoard message="This Subreddit has no post" />
      )}
    </>
  )
}

export default NewFeeds
