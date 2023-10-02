import { CardAds, CardCreatePost, CardFeedSorter, CardPageInfo, NewFeeds, TopNav } from '@/components'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'

import { Box, Container, Grid, Stack } from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.new, ordering: ORDERING.desc })

  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <TopNav />
      <Container maxWidth="md" sx={{ pt: '70px' }}>
        {sortOptions.method}
        {sortOptions.ordering}
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
