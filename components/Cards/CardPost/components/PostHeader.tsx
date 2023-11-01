import { generateSeededHexColor, generateUserImage } from '@/src/utils'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TPostHeader = {
  subName: string
  username: string
  createdAt: Date
}

function PostHeader({ subName, username, createdAt }: TPostHeader) {
  const {
    query: { subreddit: loadedInSubPage }
  } = useRouter()
  return (
    <Stack
      alignItems={{ sx: 'flex-start', md: 'center' }}
      justifyContent={{ md: 'flex-start', sx: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{ px: 1 }}
    >
      {!loadedInSubPage && (
        <Stack direction="row" alignItems="center">
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
        </Stack>
      )}
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
