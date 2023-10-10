import { Brightness5OutlinedIcon, CakeOutlinedIcon } from '@/constants/icons'
import { TUserDetail } from '@/constants/types'
import { Stack, Typography } from '@mui/material'
import format from 'date-fns/format'

const centerStyle = {
  textAlign: { xs: 'center', md: 'left' }
}

function UserInfoExtra({ user }: { user: TUserDetail | null }) {
  return (
    <Stack direction="row">
      <Stack flex={1} spacing={0.5}>
        <Typography fontWeight={700} variant="body1" sx={centerStyle}>
          Karma
        </Typography>
        <Typography variant="body1" fontSize="0.8rem" sx={{ color: 'hintText.main', ...centerStyle }}>
          <Brightness5OutlinedIcon sx={{ fontSize: '0.8rem', mr: 1, color: 'blue.main' }} />
          {user?.karma}
        </Typography>
      </Stack>
      <Stack flex={1} spacing={0.5}>
        <Typography fontWeight={700} variant="body1" sx={centerStyle}>
          Cake day
        </Typography>
        <Typography variant="body1" fontSize="0.8rem" sx={{ color: 'hintText.main', ...centerStyle }}>
          <CakeOutlinedIcon sx={{ fontSize: '0.8rem', mr: 1, color: 'blue.main' }} /> {user?.dob ? format(new Date(user?.dob), 'P') : 'N/A'}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default UserInfoExtra
