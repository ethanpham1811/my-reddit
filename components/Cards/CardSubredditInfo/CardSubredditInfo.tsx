import { RdSkeleton } from '@/components/Skeletons'
import { TSubredditDetail } from '@/constants/types'
import { formatNumber, generateSeededHexColor } from '@/src/utils'
import { Box, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import { RdCard } from '../..'
import SubredditButtons from './components/SubredditButtons'

type TCardSubredditInfoProps = {
  subreddit: TSubredditDetail | null
  loading: boolean
}

function CardSubredditInfo({ subreddit, loading }: TCardSubredditInfoProps) {
  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      {!loading && subreddit ? (
        <>
          <CardHeader
            titleTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem', color: 'white.main' } }}
            title="About Community"
            sx={{
              p: 2,
              mx: -2,
              mt: -2,
              width: 'auto',
              bgcolor: generateSeededHexColor(subreddit.name || 'seed'),
              '.MuiCardHeader-content': {
                display: 'flex',
                alignItems: 'center'
              }
            }}
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Typography variant="body1" color="initial" fontWeight={400}>
              {subreddit.description}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="center" py={1} alignItems="center">
              <Typography variant="subtitle1" fontWeight={700}>
                {formatNumber(subreddit.member || 0)}
              </Typography>{' '}
              &nbsp;
              <Typography variant="subtitle2" sx={{ color: 'hintText.main' }}>
                Members
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="center" py={1} alignItems="center">
              <Typography sx={{ fontSize: '0.8rem', mr: '5px', color: 'hintText.main' }}>Started since</Typography>
              <Typography variant="body1" color="initial" fontWeight={400}>
                {subreddit.created_at && format(new Date(subreddit.created_at), 'MMM yyyy')}
              </Typography>
            </Box>
          </CardContent>
          <SubredditButtons subreddit={subreddit} />
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardSubredditInfo
