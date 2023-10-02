import { CardAds, CardCreatePost, CardFeedSorter, CardPageInfo, NewFeeds, SubredditTopNav, TopNav } from '@/components'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'

import { Box, Container, Grid, Stack } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Subreddit() {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.new, ordering: ORDERING.desc })

  const {
    query: { subreddit }
  } = useRouter()

  return (
    <div>
      <Head>
        <title>r/{subreddit}</title>
      </Head>
      <TopNav />
      <SubredditTopNav name={subreddit as string} />
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <Box>
          <Grid container spacing={3}>
            <Grid xs={16} md={8} item>
              <Stack spacing={2}>
                <CardCreatePost />
                <CardFeedSorter sortOptions={sortOptions} setSortOptions={setSortOptions} />
                <NewFeeds sortOptions={sortOptions} />
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
