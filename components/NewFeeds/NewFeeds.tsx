import { TCardPostProps, TPost, TSortOptions } from '@/constants/types'
import { ApolloError } from '@apollo/client'
import { Skeleton, Stack } from '@mui/material'
import orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useContext } from 'react'
import { v4 as rid } from 'uuid'
import { CardPost } from '..'
import { getTotalUpvote } from '../../services'
import { AppContext } from '../Layouts/MainLayout'
import NoOwnedPost from './NoOwnedPost/NoOwnedPost'

type TNewFeedsProps = {
  sortOptions: TSortOptions
  postList: TPost[] | null
  loading: boolean
  error: ApolloError
  setHasNoPost?: Dispatch<SetStateAction<boolean>>
}

function NewFeeds({ sortOptions: { method, ordering }, postList, loading, error, setHasNoPost }: TNewFeedsProps) {
  const { me } = useContext(AppContext)
  const {
    query: { subreddit: subPageName }
  } = useRouter()
  setHasNoPost && postList && setHasNoPost(!loading && postList.length === 0)

  const showPost = me && me.member_of_ids?.includes(subPageName as string) //TODO: check sub type by accessing cache

  /* postList mapping */
  const cardPostList: TCardPostProps[] | null =
    postList &&
    orderBy(
      postList.map(({ id, title, body, images, comment, created_at, user: { username }, subreddit, vote }: TPost): TCardPostProps => {
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
        <NoOwnedPost />
      )}
    </>
  )
}

export default NewFeeds
