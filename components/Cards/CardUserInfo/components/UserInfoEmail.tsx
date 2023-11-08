import { TUserDetail } from '@/constants/types'
import { Box, Typography } from '@/mui'

type TUserInfoEmailProps = {
  user: TUserDetail | null
}

function UserInfoEmail({ user }: TUserInfoEmailProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={1}>
      <Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
        {user?.email}
      </Typography>
    </Box>
  )
}

export default UserInfoEmail
