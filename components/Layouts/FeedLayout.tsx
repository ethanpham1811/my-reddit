import { CardCreatePost } from '@/components'

import { Box, Container, Grid, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { Children, ReactNode, useContext } from 'react'
import { AppContext } from './MainLayout'

type TFeedLayoutProps = {
  children: ReactNode
  top: string
  subredditId?: number
  single?: boolean
  loading?: boolean
}

function FeedLayout({ loading, children, top, subredditId, single = false }: TFeedLayoutProps) {
  const { session } = useContext(AppContext)
  const me = session?.userDetail
  const {
    query: { subreddit, username, postid },
    pathname
  } = useRouter()
  const mainContent = Children.toArray(children)[0]
  const sideContent = Children.toArray(children)[1]

  // check weather user has permission to create post
  let allowCreatePost = true
  if (subreddit && me) {
    allowCreatePost = me.member_of_ids?.includes(subreddit as string) ?? false
  }
  if (username && me) {
    allowCreatePost = username === me.username.toString() ?? false
  }
  if (postid || pathname === '/search') {
    allowCreatePost = false
  }

  return (
    <Container maxWidth="md" sx={{ pt: top, pb: 5 }}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={16} md={single || loading ? 16 : 8} item order={!single || loading ? { xs: 2, md: 1 } : {}}>
            <Stack spacing={2}>
              {me && allowCreatePost && <CardCreatePost subId={subredditId} />}
              {mainContent}
            </Stack>
          </Grid>
          {!single && !loading && (
            <Grid xs={16} md={4} item order={{ xs: 1, md: 2 }}>
              {sideContent}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  )
}

export default FeedLayout
