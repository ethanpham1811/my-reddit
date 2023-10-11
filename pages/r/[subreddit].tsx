import { CardFeedSorter, CardSubredditInfo, NewFeeds, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'
import useSubredditByName from '@/hooks/useSubredditByName'

import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Subreddit: NextPage = () => {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { subreddit: subName }
  } = useRouter()
  const [subredditData, subredditPosts, loading, error] = useSubredditByName(subName)
  const [hasNoPost, setHasNoPost] = useState(false)

  return (
    <div>
      <Head>
        <title>r/{subName}</title>
      </Head>
      <SubredditTopNav name={subredditData?.name} subType={subredditData?.subType} headline={subredditData?.headline} />
      <FeedLayout top="1rem" subredditId={subredditData?.id} sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
        <NewFeeds
          subType={subredditData?.subType}
          postList={subredditPosts}
          loading={loading}
          error={error}
          sortOptions={sortOptions}
          setHasNoPost={setHasNoPost}
        />
        <CardSubredditInfo subreddit={subredditData} loading={loading} />
      </FeedLayout>
    </div>
  )
}

export default Subreddit
