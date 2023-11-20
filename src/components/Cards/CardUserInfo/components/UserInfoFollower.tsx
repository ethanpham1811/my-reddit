import { TUserDetail } from '@/src/constants/types'
import { Box, Typography } from '@/src/mui'
import { formatNumber } from '@/src/services/utils'

function UserInfoFollower({ user }: { user: TUserDetail | null }) {
  return (
    <Box display="flex" justifyContent="center" py={0.5} alignItems="center">
      <Typography variant="subtitle1" fontWeight={700}>
        {formatNumber(user?.followers || 0)}
      </Typography>{' '}
      &nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: '0.8rem', color: 'hintText.main' }}>
        followers
      </Typography>
    </Box>
  )
}

export default UserInfoFollower
