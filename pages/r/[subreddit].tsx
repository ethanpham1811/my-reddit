import { NewFeeds, SubredditTopNav } from '@/components'
import withSubredditPostList from '@/components/HOCs/withSubredditPostList'
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

  const [subredditData, loading] = useSubredditByName(subName)
  const SubredditNewFeeds = withSubredditPostList(NewFeeds, subredditData?.id)

  return (
    <div>
      <Head>
        <title>r/{subName}</title>
      </Head>
      <SubredditTopNav name={subredditData?.name} headline={subredditData?.headline} />
      <FeedLayout top="1rem" subredditId={subredditData?.id} sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <SubredditNewFeeds sortOptions={sortOptions} />
      </FeedLayout>
    </div>
  )
}

export default Subreddit
