import homeBannerUrl from '@/public/home_banner.png'
import redditRobotUrl from '@/public/reddit_robot.png'
import { useAppSession } from '@/src/Layouts/MainLayout'
import { CardActions, CardContent, CardHeader, CardMedia, Divider, Typography } from '@/src/mui'
import { Events, eventEmitter } from '@/src/services/eventEmitter'
import Image from 'next/image'
import { RdButton, RdCard } from '../..'

function CardHomeInfo() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const isDisabled: boolean = !me || !me.member_of_ids || me?.member_of_ids?.length === 0

  function onCreatePost() {
    eventEmitter.dispatch(Events.OPEN_CREATE_POST_FORM, true)
  }

  function onCreateCommunity() {
    eventEmitter.dispatch(Events.OPEN_CREATE_COMMUNITY_DRAWER, true)
  }

  return (
    <RdCard sx={{ flex: 1, gap: 1, display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height={34} image={homeBannerUrl.src} alt="Home cover" sx={{ mx: -1, mt: -1, width: 'auto' }} />
      <CardHeader
        avatar={<Image alt="reddit robot" aria-label="reddit robot" src={redditRobotUrl.src} width={40} height={68} />}
        titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem', mt: 3 } }}
        title="Home"
        sx={{ p: 0, mt: -2.5 }}
      />
      <CardContent sx={{ p: 0 }}>
        <Typography variant="body1" color="black" fontWeight={400}>
          Your personal Reddit frontpage. Come here to check in with your favorite communities.
        </Typography>
      </CardContent>
      {me && (
        <>
          <Divider sx={{ my: 0.5 }} />
          <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <RdButton disabled={isDisabled} text={'Create Post'} filled={!isDisabled} color="blue" invertColor onClick={onCreatePost} />

            <RdButton text={'Create Community'} color="blue" onClick={onCreateCommunity} />
          </CardActions>
        </>
      )}
    </RdCard>
  )
}

export default CardHomeInfo
