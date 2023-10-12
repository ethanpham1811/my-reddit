import { CardFeedSorter, CardSubredditInfo, NewFeeds, SubredditTopNav } from '@/components'
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
  const [subreddit, subredditPosts, loading, error] = useSubredditByName(subName)
  const [hasNoPost, setHasNoPost] = useState(false)

  return (
    <div>
      <Head>
        <title>r/{subName}</title>
      </Head>
      <SubredditTopNav name={subreddit?.name} subType={subreddit?.subType} headline={subreddit?.headline} />
      <FeedLayout top="1rem" subredditId={subreddit?.id}>
        <Stack spacing={2}>
          <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
          <NewFeeds
            subType={subreddit?.subType}
            postList={subredditPosts}
            loading={loading}
            error={error}
            sortOptions={sortOptions}
            setHasNoPost={setHasNoPost}
          />
        </Stack>
        <CardSubredditInfo subreddit={subreddit} loading={loading} />
      </FeedLayout>
    </div>
  )
}

export default Subreddit
