import { TSession } from '@/constants/types'
import homeBannerUrl from '@/public/home_banner.png'
import redditRobotUrl from '@/public/reddit_robot.png'
import { CardActions, CardContent, CardHeader, CardMedia, Divider, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { CommunityCreator, RdButton, RdCard, RdDrawer } from '../..'

function CardHomeInfo() {
  const { data, status }: TSession = useSession()
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height={34} image={homeBannerUrl.src} alt="Home cover" sx={{ mx: -1, mt: -1, width: 'auto' }} />
      <CardHeader
        avatar={<Image alt="reddit robot" aria-label="reddit robot" src={redditRobotUrl.src} width={40} height={68} />}
        titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem', mt: 3 } }}
        title="Home"
        sx={{ p: 0, mt: -2.5 }}
      />
      <CardContent sx={{ p: 0 }}>
        <Typography variant="body1" color="initial" fontWeight={400}>
          Your personal Reddit frontpage. Come here to check in with your favorite communities.
        </Typography>
      </CardContent>
      <Divider sx={{ my: 0.5 }} />
      <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <RdButton text={'Create Post'} filled color="blue" invertColor />
        <RdButton text={'Create Community'} color="blue" onClick={() => setIsDrawerOpened(true)} />
        <RdDrawer open={isDrawerOpened} setOpen={setIsDrawerOpened}>
          <CommunityCreator setOpen={setIsDrawerOpened} />
        </RdDrawer>
      </CardActions>
    </RdCard>
  )
}

export default CardHomeInfo
