import { generateUserImage } from '@/services'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Link from 'next/link'

type TPostHeader = {
  inGroup: boolean | undefined
  subName: string
  username: string
  createdAt: Date
}

function PostHeader({ inGroup, subName, username, createdAt }: TPostHeader) {
  return (
    <Stack direction="row" alignItems="center" sx={{ px: 1 }}>
      {!inGroup && (
        <Link href={`/r/${subName}`}>
          <Avatar
            sx={{
              width: 20,
              height: 20,
              mr: 0.5,
              backgroundColor: 'inputBgOutfocused.main'
              // border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
            }}
            alt={subName}
            src={generateUserImage(subName)}
          />
        </Link>
      )}

      {!inGroup && (
        <Stack direction="row">
          <Link href={`/r/${subName}`} onClick={(e) => e.stopPropagation()} style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography fontWeight={600} color="black">
              r/{subName}{' '}
            </Typography>
          </Link>
          <Box mx={0.5}>•</Box>
        </Stack>
      )}
      <Typography variant="caption">
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
