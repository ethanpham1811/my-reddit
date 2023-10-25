import { generateSeededHexColor, generateUserImage } from '@/services'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Link from 'next/link'

type TPostHeader = {
  loadedInSubPage: boolean | undefined
  subName: string
  username: string
  createdAt: Date
}

function PostHeader({ loadedInSubPage, subName, username, createdAt }: TPostHeader) {
  return (
    <Stack
      alignItems={{ sx: 'flex-start', md: 'center' }}
      justifyContent={{ md: 'flex-start', sx: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{ px: 1 }}
    >
      <Stack direction="row" alignItems="center">
        {!loadedInSubPage && (
          <Link href={`/r/${subName}`}>
            <Avatar
              sx={{
                width: 20,
                height: 20,
                mr: 0.5,
                backgroundColor: generateSeededHexColor(subName)
                // border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
              }}
              alt={subName}
              src={generateUserImage(subName)}
            />
          </Link>
        )}
        {!loadedInSubPage && (
          <Stack direction="row">
            <Link href={`/r/${subName}`} onClick={(e) => e.stopPropagation()} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography fontWeight={600} color="black">
                r/{subName}{' '}
              </Typography>
            </Link>
            <Box mx={0.5} display={{ xs: 'none', md: 'block' }} position="relative" top={0.5}>
              •
            </Box>
          </Stack>
        )}
      </Stack>
      <Typography variant="caption" sx={{ mt: 0.5 }}>
        Posted by{' '}
        <Link href={`/u/${username}`} onClick={(e) => e.stopPropagation()} style={{ color: 'inherit' }}>
          u/{username}
        </Link>{' '}
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </Typography>
    </Stack>
  )
}

export default PostHeader
