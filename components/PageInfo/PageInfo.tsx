import homeBannerUrl from '@/public/home_banner.png'
import redditRobotUrl from '@/public/reddit_robbot.png'
import { CardActions, CardContent, CardHeader, CardMedia, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import { RdButton, RdCard } from '..'

function PageInfo() {
  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height={34} image={homeBannerUrl.src} alt="Paella dish" sx={{ mx: -1, mt: -1, width: 'auto' }} />
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
        <RdButton text={'Create Post'} bgcolor="blue" invertColor />
        <RdButton text={'Create Community'} bgcolor="white" color="blue" />
      </CardActions>
    </RdCard>
  )
}

export default PageInfo
