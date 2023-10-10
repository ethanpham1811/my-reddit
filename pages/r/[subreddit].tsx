import { CardSubredditInfo, NewFeeds, SubredditTopNav } from '@/components'
import withSubredditPostList from '@/components/HOCs/withSubredditPostList'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'
import useSubredditByName from '@/hooks/useSubredditByName'
import { Stack } from '@mui/material'

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
      <SubredditTopNav name={subredditData?.name} subType={subredditData?.subType} headline={subredditData?.headline} />
      <FeedLayout top="1rem" subredditId={subredditData?.id} sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <SubredditNewFeeds sortOptions={sortOptions} />
        <Stack spacing={2}>
          <CardSubredditInfo subreddit={subredditData} loading={loading} />
        </Stack>
      </FeedLayout>
    </div>
  )
}

export default Subreddit
