import { CardAds, CardCreatePost, CardFeedSorter, CardPageInfo, NewFeeds, TopNav } from '@/components'

import { Box, Container, Grid, Stack } from '@mui/material'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <TopNav />
      <Container maxWidth="md" sx={{ pt: '70px' }}>
        <Box>
          <Grid container spacing={3}>
            <Grid xs={16} md={8} item>
              <Stack spacing={2}>
                <CardCreatePost />
                <CardFeedSorter />
                <NewFeeds />
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
