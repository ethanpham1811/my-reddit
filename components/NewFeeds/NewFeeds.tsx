import { TCardPostProps, TPost } from '@/constants/types'
import usePostList from '@/hooks/usePostList'
import { v4 as rid } from 'uuid'
import { CardPost } from '..'
import { getTotalUpvote, parseImages } from '../utilities'

function NewFeeds() {
  const [postList, loading] = usePostList()

  const cardPostList: TCardPostProps[] | [] = postList
    ? postList.map((post: TPost): TCardPostProps => {
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
      })
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
