import { CardCreatePost } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { Box, Container, Grid, Skeleton, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { Children, Fragment, ReactNode } from 'react'
import { RdSkeletonListItem, RdSkeletonSideColumn } from '../Skeletons'

type TFeedLayoutProps = {
  children: ReactNode
  top: string
  subredditId?: number
  single?: boolean
  loading?: boolean
}

function FeedLayout({ loading, children, top, subredditId, single = false }: TFeedLayoutProps) {
  const { session, loading: sessionLoading } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit, username, postid },
    pathname
  } = useRouter()
  const mainContent = Children.toArray(children)[0]
  const sideContent = Children.toArray(children)[1]

  // check weather user has permission to create post
  function validateUser() {
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
    return allowCreatePost
  }

  return (
    <Container maxWidth="md" sx={{ pt: top, pb: 5 }}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={16} md={single || loading ? 16 : 8} item order={!single || loading ? { xs: 2, md: 1 } : {}}>
            {sessionLoading ? (
              <Stack spacing={2}>
                <Skeleton variant="rectangular" width="100%" height="60px" />
                <Skeleton variant="rectangular" width="100%" height="60px" />
                {[0, 1].map((el) => (
                  <Fragment key={`skeleton_${el}`}>
                    <RdSkeletonListItem py={0} index={el.toString()} />
                  </Fragment>
                ))}
              </Stack>
            ) : (
              <Stack spacing={2}>
                {me && validateUser() && <CardCreatePost subId={subredditId} />}
                {mainContent}
              </Stack>
            )}
          </Grid>
          {!single && !loading && (
            <Grid xs={16} md={4} item order={{ xs: 1, md: 2 }}>
              {sessionLoading ? <RdSkeletonSideColumn /> : sideContent}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  )
}

export default FeedLayout
