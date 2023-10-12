import { CardCreatePost } from '@/components'
import { TSession } from '@/constants/types'

import useUserByUsername from '@/hooks/useUserByUsername'
import { Box, Container, Grid, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Children, ReactNode, useContext } from 'react'
import { AppContext } from './MainLayout'

type TFeedLayoutProps = {
  children: ReactNode
  top: string
  subredditId?: number
}

function FeedLayout({ children, top, subredditId }: TFeedLayoutProps) {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  const {
    query: { subreddit, username, postid }
  } = useRouter()
  const { data: session }: TSession = useSession()
  const mainContent = Children.toArray(children)[0]
  const sideContent = Children.toArray(children)[1]

  // check weather user has permission to create post
  let allowCreatePost = false
  if (subreddit && me) {
    allowCreatePost = me.member_of_ids?.includes(subreddit as string) ?? false
  }
  if (username && me) {
    allowCreatePost = username === me.username.toString() ?? false
  }
  if (postid) {
    allowCreatePost = false
  }

  return (
    <Container maxWidth="md" sx={{ pt: top }}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={16} md={8} item order={{ xs: 2, md: 1 }}>
            <Stack spacing={2}>
              {session && allowCreatePost && <CardCreatePost subId={subredditId} />}
              {mainContent}
            </Stack>
          </Grid>
          <Grid xs={16} md={4} item order={{ xs: 1, md: 2 }}>
            {sideContent}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default FeedLayout
