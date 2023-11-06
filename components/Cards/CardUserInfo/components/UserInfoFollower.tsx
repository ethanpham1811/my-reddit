import { TUserDetail } from '@/constants/types'
import { Box, Typography } from '@/mui'
import { formatNumber } from '@/src/utils'

function UserInfoFollower({ user }: { user: TUserDetail | null }) {
  return (
    <Box display="flex" justifyContent="center" py={0.5} alignItems="center">
      <Typography variant="subtitle1" fontWeight={700}>
        {formatNumber(user?.followers || 0)}
      </Typography>{' '}
      &nbsp;
      <Typography variant="subtitle2" sx={{ color: 'hintText.main', mt: '-1px' }}>
        Followers
      </Typography>
    </Box>
  )
}

export default UserInfoFollower
