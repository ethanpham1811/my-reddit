import { TCardPostProps, TPost, TSortOptions } from '@/constants/types'
import usePostList from '@/hooks/usePostList'
import orderBy from 'lodash/orderBy'
import { v4 as rid } from 'uuid'
import { CardPost } from '..'
import { getTotalUpvote, parseImages } from '../utilities'

type TNewFeeds = {
  sortOptions: TSortOptions
}

function NewFeeds({ sortOptions: { method, ordering } }: TNewFeeds) {
  const [postList, loading, error] = usePostList()

  const cardPostList: TCardPostProps[] | [] = postList
    ? orderBy(
        postList.map((post: TPost): TCardPostProps => {
          const { title, body, images, comment, created_at, username, subreddit, vote } = post
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
      {cardPostList.length > 0 ? (
        cardPostList.map((post) => {
          const { title, body, images, comment, createdAt, username, subreddit, upvote } = post
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
      ) : (
        <div>No post found!</div>
      )}
    </>
  )
}

export default NewFeeds
