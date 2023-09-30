import { CardAds, CardCreatePost, CardFeedSorter, CardPageInfo, CardPost, TopNav } from '@/components'
import { TImage, TUser } from '@/constants/types'
import img1 from '@/public/1.jpg'
import img2 from '@/public/2.jpg'
import { Box, Container, Grid, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

const imgList: TImage[] = [
  {
    imgSrc: img1,
    caption: 'Scenery 1'
  },
  {
    imgSrc: img2,
    caption: 'Scenery 2'
  }
]

export default function Home() {
  const { data: session } = useSession()
  const user: TUser | null = session && {
    id: '123',
    name: session.user?.name || '',
    image: session.user?.image || ''
  }
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
                {user && (
                  <CardPost
                    images={imgList}
                    title={'My very first post is available now!'}
                    body={
                      'past thee massage outline clock ability move rays same behavior town learn later wrapped four value neighborhood afraid two view does rain clean enjoy'
                    }
                    user={user}
                    createdAt={new Date(2014, 6, 2)}
                    upvote={123}
                    subreddit={'Very odd subreddit'}
                  />
                )}
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
