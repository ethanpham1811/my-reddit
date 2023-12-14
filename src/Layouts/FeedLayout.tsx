import { useAppSession } from '@/src/Layouts/MainLayout'
import { CardCreatePost } from '@/src/components'
import { Box, Container, Grid, Stack } from '@/src/mui'
import { ContainerProps } from '@mui/material/Container'
import { SxProps, Theme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Children, ReactNode, useRef } from 'react'
import { RdSkeletonDoublePost, RdSkeletonSideColumn } from '../components/Skeletons'
import RdScrollBtn from '../components/utilities/RdScrollBtn/RdScrollBtn'

type TFeedLayoutProps = Pick<ContainerProps, 'sx'> & {
  children: ReactNode
  top: string
  subredditId?: number
  allowCreatePost?: boolean
  single?: boolean
  loading?: boolean
  ignoreLayoutLoading?: boolean
  sx?: SxProps<Theme>
}

/**
 * Layout to wrap: Post creator + Post list + right info cards
 * @param  {boolean} single   single column layout (only for search page)
 * @param  {string} top       custom top (for page with banners)
 */
function FeedLayout({ allowCreatePost = false, ignoreLayoutLoading, loading, children, top, subredditId, single = false, sx }: TFeedLayoutProps) {
  const { loading: sessionLoading } = useAppSession()
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // children addressing
  const mainContent = Children.toArray(children)[0]
  const sideContent = Children.toArray(children)[1]

  return (
    <Container ref={wrapperRef} maxWidth="md" sx={{ pt: top, pb: 5, ...sx }}>
      <Box>
        <Grid container spacing={3}>
          <Grid
            sx={{ '&.MuiGrid-item': { pt: { xs: 2, md: 3 } } }}
            xs={12}
            md={single || loading ? 12 : 8}
            item
            order={!single || loading ? { xs: 2, md: 1 } : {}}
          >
            <Stack spacing={2}>
              {!ignoreLayoutLoading && sessionLoading ? (
                <RdSkeletonDoublePost />
              ) : (
                <>
                  {allowCreatePost && <CardCreatePost subId={subredditId} />}
                  {mainContent}
                </>
              )}
            </Stack>

            {/* anchor for scroll to bottom */}
            <Box id="bottom-anchor" ref={bottomRef} />
          </Grid>

          {/* right side cards */}
          {!single && !loading && (
            <Grid xs={12} md={4} item order={{ xs: 1, md: 2 }}>
              <Box sx={{ position: { xs: 'unset', md: 'sticky' }, top: { xs: 'unset', md: router?.query?.subreddit ? '60px' : '70px' } }}>
                {sessionLoading ? <RdSkeletonSideColumn /> : sideContent}

                {/* scroll to top/bottom btn */}
                <RdScrollBtn wrapperRef={wrapperRef} topRef={wrapperRef} bottomRef={bottomRef} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  )
}

export default FeedLayout
