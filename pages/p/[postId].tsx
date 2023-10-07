import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Post: NextPage = () => {
  const {
    query: { postId }
  } = useRouter()

  // const [subredditData, loading] = useSubredditByName(subName)
  // const SubredditNewFeeds = withSubredditPostList(NewFeeds, subredditData?.id)

  return (
    <div>
      <Head>
        <title>p/{postId}</title>
      </Head>
      {/* <SubredditTopNav name={subredditData?.name} headline={subredditData?.headline} />
      <FeedLayout top="1rem" subredditId={subredditData?.id} sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <SubredditNewFeeds sortOptions={sortOptions} />
      </FeedLayout> */}
    </div>
  )
}

export default Post
