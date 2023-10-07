import { RdSkeleton } from '@/components/Skeletons'
import { formatNumber, generateSeededHexColor, generateUserImage } from '@/components/utilities'
import { TUserDetail } from '@/constants/types'
import homeBannerUrl from '@/public/home_banner.png'
import { Avatar, Box, CardActions, CardContent, CardHeader, CardMedia, Divider, Stack, Typography } from '@mui/material'
import format from 'date-fns/format'
import { RdButton, RdCard } from '../..'

type TCardUserInfoProps = {
  user: TUserDetail | null
  loading: boolean
}

function CardUserInfo({ user, loading }: TCardUserInfoProps) {
  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      {!loading ? (
        <>
          <CardMedia component="img" height={80} image={homeBannerUrl.src} alt="user cover" sx={{ mx: -2, mt: -2, width: 'auto' }} />
          <CardHeader
            avatar={
              <Avatar
                variant="rounded"
                sx={{
                  width: 70,
                  height: 70,
                  backgroundColor: generateSeededHexColor(user?.username || 'seed'),
                  border: (theme): string => `4px solid ${theme.palette.white.main}`
                }}
                alt={`${user?.username} avatar`}
                src={generateUserImage(user?.username || 'seed')}
              />
            }
            sx={{ p: 0, mt: -5.5 }}
          />
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6" color="initial" fontWeight={700}>
              {user?.fullName}
            </Typography>
            <Typography variant="subtitle1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
              u/{user?.username}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ color: 'blue.main' }}>
              {user?.email}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row">
              <Stack flex={1}>
                <Typography fontWeight={700} variant="body1">
                  Karma
                </Typography>
                <Typography variant="body1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
                  {user?.karma}
                </Typography>
              </Stack>
              <Stack flex={1}>
                <Typography fontWeight={700} variant="body1">
                  Cake day
                </Typography>
                <Typography variant="body1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
                  {user?.dob ? format(new Date(), 'PPP') : 'NaN'}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="center" py={1} alignItems="center">
              <Typography variant="subtitle1" fontWeight={700}>
                {formatNumber(user?.followers || 0)}
              </Typography>{' '}
              &nbsp;
              <Typography variant="subtitle2" sx={{ color: 'hintText.main' }}>
                Followers
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <RdButton text={'New Post'} filled color="blue" invertColor />
          </CardActions>
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardUserInfo
