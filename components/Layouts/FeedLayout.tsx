import { CardCreatePost } from '@/components'
import { TSession, TSortOptions } from '@/constants/types'

import useUserByUsername from '@/hooks/useUserByUsername'
import { Box, Container, Grid, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Children, Dispatch, ReactNode, SetStateAction, useContext } from 'react'
import { AppContext } from './MainLayout'

type TFeedLayoutProps = {
  children: ReactNode
  top: string
  subredditId?: number
  sortOptions: TSortOptions
  setSortOptions: Dispatch<SetStateAction<TSortOptions>>
}

function FeedLayout({ children, top, subredditId, sortOptions, setSortOptions }: TFeedLayoutProps) {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  const {
    query: { subreddit, username }
  } = useRouter()
  const { data: session }: TSession = useSession()
  const sorter = Children.toArray(children)[0]
  const mainContent = Children.toArray(children)[1]
  const sideContent = Children.toArray(children)[2]

  let allowCreatePost = false
  if (subreddit && me) {
    allowCreatePost = me.member_of_ids?.includes(subreddit as string) ?? false
  }
  if (username && me) {
    allowCreatePost = username === me.username.toString() ?? false
  }

  return (
    <Container maxWidth="md" sx={{ pt: top }}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={16} md={8} item order={{ xs: 2, md: 1 }}>
            <Stack spacing={2}>
              {session && allowCreatePost && <CardCreatePost subId={subredditId} />}
              {sorter}
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
