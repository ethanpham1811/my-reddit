import { CardCreatePost } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { Box, Container, Grid, Stack } from '@/mui'
import { ContainerProps } from '@mui/material/Container'
import { SxProps, Theme } from '@mui/material/styles'
import { Children, ReactNode } from 'react'
import { RdSkeletonDoublePost, RdSkeletonSideColumn } from '../Skeletons'

type TFeedLayoutProps = Pick<ContainerProps, 'sx'> & {
  children: ReactNode
  top: string
  subredditId?: number
  allowCreatePost?: boolean
  single?: boolean
  loading?: boolean
  sx?: SxProps<Theme>
}

/**
 * Layout to wrap: Post creator + Post list + right info cards
 * @param  {boolean} single   single column layout (only for search page)
 * @param  {string} top       custom top (for page with banners)
 */
function FeedLayout({ allowCreatePost = false, loading, children, top, subredditId, single = false, sx }: TFeedLayoutProps) {
  const { session, loading: sessionLoading } = useAppSession()
  const me = session?.userDetail

  // children addressing
  const mainContent = Children.toArray(children)[0]
  const sideContent = Children.toArray(children)[1]

  return (
    <Container maxWidth="md" sx={{ pt: top, pb: 5, ...sx }}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={16} md={single || loading ? 16 : 8} item order={!single || loading ? { xs: 2, md: 1 } : {}}>
            <Stack spacing={2}>
              {sessionLoading ? (
                <RdSkeletonDoublePost />
              ) : (
                <>
                  {me && allowCreatePost && <CardCreatePost subId={subredditId} />}
                  {mainContent}
                </>
              )}
            </Stack>
          </Grid>

          {/* right side cards */}
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
