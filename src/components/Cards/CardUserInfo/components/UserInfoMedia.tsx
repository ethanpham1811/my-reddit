import { TUserDetail } from '@/src/constants/types'
import { Avatar, CardHeader, CardMedia } from '@/src/mui'
import { generateSeededHexColor, generateUserCover, generateUserImage } from '@/src/services/utils'

function UserInfoMedia({ user }: { user: TUserDetail | null }) {
  return (
    <>
      <CardMedia
        component="img"
        height={80}
        image={generateUserCover(user?.email || 'seed', 400, 100)}
        alt="user cover"
        sx={{ mx: -2, mt: -2, width: 'auto' }}
      />
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              width: 70,
              height: 70,
              ml: '-4px',
              backgroundColor: generateSeededHexColor(user?.username || 'seed'),
              border: (theme): string => `4px solid ${theme.palette.white.main}`
            }}
            alt={`${user?.username} avatar`}
            src={generateUserImage(user?.username || 'seed')}
          />
        }
        sx={{ p: 0, mt: -5.5 }}
      />
    </>
  )
}

export default UserInfoMedia
