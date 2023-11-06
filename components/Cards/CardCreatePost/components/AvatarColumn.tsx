import { Avatar, Box } from '@/mui'
import { OnlineDotStyle } from '@/mui/styles'
import { generateUserImage } from '@/src/utils'
import Link from 'next/link'

function AvatarColumn({ userName }: { userName: string | undefined }) {
  return (
    <Box width={50}>
      <OnlineDotStyle overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
        <Link href={`/u/${userName}`}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              backgroundColor: 'inputBgOutfocused.main',
              border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
            }}
            alt={userName || ''}
            src={generateUserImage(userName || 'seed')}
          />
        </Link>
      </OnlineDotStyle>
    </Box>
  )
}

export default AvatarColumn
