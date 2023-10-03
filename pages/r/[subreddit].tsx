import { CardAds, CardCreatePost, CardFeedSorter, CardPageInfo, NewFeeds, SubredditTopNav } from '@/components'
import withSubredditPostList from '@/components/HOCs/withSubredditPostList'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'
import useSubredditByName from '@/hooks/useSubredditByName'

import { Box, Container, Grid, Stack } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Subreddit() {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.new, ordering: ORDERING.desc })
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
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <Box>
          <Grid container spacing={3}>
            <Grid xs={16} md={8} item>
              <Stack spacing={2}>
                <CardCreatePost subId={subredditData?.id} />
                <CardFeedSorter sortOptions={sortOptions} setSortOptions={setSortOptions} />
                <SubredditNewFeeds sortOptions={sortOptions} />
              </Stack>
            </Grid>
            <Grid xs={16} md={4} item>
              <Stack spacing={2}>
                <CardAds />
                <CardPageInfo />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Subreddit
