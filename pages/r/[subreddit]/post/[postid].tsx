import { CardPost, CardSubredditInfo, MessageBoard, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import useSubPostByNameAndPostId from '@/hooks/useSubPostByNameAndPostId'
import { getTotalUpvote, validatePostBySubname } from '@/services'
import { Stack } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Post: NextPage = () => {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subName, postid },
    push: navigate
  } = useRouter()
  const [subreddit, post, loading, error] = useSubPostByNameAndPostId(subName, postid)

  // redirect to 404 if no data found
  post === null && !loading && !error && navigate('/404')

  // if post in public subreddit OR user in subreddit => return true
  const verifyPost = (): boolean => {
    return validatePostBySubname(me?.member_of_ids, subName, post?.subreddit?.subType)
  }

  const cardPost = () => {
    if (!post) return <MessageBoard head="This post does not exist" />
    const {
      id,
      images,
      title,
      body,
      created_at,
      vote,
      user: { username },
      comment,
      link
    } = post
    return (
      <CardPost
        id={id}
        images={images}
        title={title}
        body={body}
        createdAt={created_at}
        upvote={vote ? getTotalUpvote(vote) : 0}
        subName={subName as string}
        username={username}
        comment={comment}
        inGroup={!!subName}
        link={link}
      />
    )
  }

  return (
    <div>
      <Head>
        <title>r/{subName}</title>
      </Head>
      <SubredditTopNav name={subreddit?.name} subType={subreddit?.subType} headline={subreddit?.headline} />
      <FeedLayout top="1rem" subredditId={subreddit?.id}>
        {!verifyPost() ? (
          <MessageBoard head={'This post is private, please join '} highlight={subName as string} />
        ) : (
          <Stack spacing={2}>{post && cardPost()}</Stack>
        )}
        <CardSubredditInfo subreddit={subreddit} loading={loading} />
      </FeedLayout>
    </div>
  )
}

export default Post
