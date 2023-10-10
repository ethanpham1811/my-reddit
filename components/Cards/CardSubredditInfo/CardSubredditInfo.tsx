import { RdSkeleton } from '@/components/Skeletons'
import { SESSION_STATUS } from '@/constants/enums'
import { TSession, TSubredditDetail } from '@/constants/types'
import { formatNumber, generateSeededHexColor } from '@/services'
import { Box, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { RdButton, RdCard } from '../..'

type TCardSubredditInfoProps = {
  subreddit: TSubredditDetail | null
  loading: boolean
}

function CardSubredditInfo({ subreddit, loading }: TCardSubredditInfoProps) {
  const { data: session, status }: TSession = useSession()

  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      {!loading && status === SESSION_STATUS.Authenticated ? (
        <>
          <CardHeader
            titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem', color: 'white.main' } }}
            title="About Community"
            sx={{
              p: 2,
              mx: -2,
              mt: -2,
              width: 'auto',
              bgcolor: generateSeededHexColor(subreddit?.name || 'seed'),
              '.MuiCardHeader-content': {
                display: 'flex',
                alignItems: 'center'
              }
            }}
          />
          <CardContent sx={{ p: 0 }}>
            <Typography variant="body1" color="initial" fontWeight={400}>
              {subreddit?.description}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="center" py={1} alignItems="center">
              <Typography variant="subtitle1" fontWeight={700}>
                {formatNumber(subreddit?.member || 0)}
              </Typography>{' '}
              &nbsp;
              <Typography variant="subtitle2" sx={{ color: 'hintText.main' }}>
                Members
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {status === SESSION_STATUS.Authenticated && (
              <>
                {false ? (
                  <RdButton text={'Follow'} filled color="blue" invertColor />
                ) : (
                  <RdButton text={'Create Post'} filled color="blue" invertColor />
                )}
              </>
            )}
            {status === SESSION_STATUS.Unauthenticated && <RdButton text={'Login'} filled color="blue" invertColor />}
          </CardActions>
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardSubredditInfo
