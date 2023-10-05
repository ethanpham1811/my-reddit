import { TCardPostProps, TPost, TSortOptions } from '@/constants/types'
import { ApolloError } from '@apollo/client'
import { Skeleton, Stack } from '@mui/material'
import orderBy from 'lodash/orderBy'
import { v4 as rid } from 'uuid'
import { CardPost } from '..'
import { getTotalUpvote, parseImages } from '../utilities'

type TNewFeedsProps = {
  sortOptions: TSortOptions
  postList: TPost[]
  loading: boolean
  error: ApolloError
}

function NewFeeds({ sortOptions: { method, ordering }, postList, loading, error }: TNewFeedsProps) {
  const cardPostList: TCardPostProps[] | [] = postList
    ? orderBy(
        postList.map(({ title, body, images, comment, created_at, username, subreddit, vote }: TPost): TCardPostProps => {
          return {
            title,
            body,
            comment,
            username,
            createdAt: new Date(created_at),
            subreddit: subreddit.name,
            images: parseImages(images),
            upvote: getTotalUpvote(vote)
          }
        }),
        method,
        ordering
      )
    : []

  return (
    <>
      {cardPostList.length > 0
        ? cardPostList.map(({ title, body, images, comment, createdAt, username, subreddit, upvote }) => {
            return (
              <CardPost
                key={`post_${rid()}`}
                images={images}
                title={title}
                body={body}
                createdAt={createdAt}
                upvote={upvote}
                subreddit={subreddit}
                username={username}
                comment={comment}
              />
            )
          })
        : [0, 1].map((el) => (
            <Stack height={400} py={2} gap={1} key={`loading_ske_${el}`}>
              <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="60%" height="25px" />
              <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="80%" height="12px" />
              <Skeleton sx={{ display: 'flex', flex: 1 }} variant="rectangular" width="100%" />
              <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="30%" height="12px" />
            </Stack>
          ))}
    </>
  )
}

export default NewFeeds
