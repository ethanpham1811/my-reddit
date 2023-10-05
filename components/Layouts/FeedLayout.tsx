import { CardAds, CardCreatePost, CardFeedSorter, CardPageInfo } from '@/components'
import { TSortOptions } from '@/constants/types'

import { Box, Container, Grid, Stack } from '@mui/material'
import { Dispatch, ReactNode, SetStateAction } from 'react'

type TFeedLayoutProps = {
  children: ReactNode
  top: string
  subredditId?: number
  sortOptions: TSortOptions
  setSortOptions: Dispatch<SetStateAction<TSortOptions>>
}

function FeedLayout({ children, top, subredditId, sortOptions, setSortOptions }: TFeedLayoutProps) {
  return (
    <Container maxWidth="md" sx={{ pt: top }}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={16} md={8} item>
            <Stack spacing={2}>
              <CardCreatePost subId={subredditId} />
              <CardFeedSorter sortOptions={sortOptions} setSortOptions={setSortOptions} />
              {children}
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
  )
}

export default FeedLayout
