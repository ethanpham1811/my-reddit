import { generateUserImage } from '@/services'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Link from 'next/link'

type TPostHeader = {
  inGroup: boolean | undefined
  subreddit: string
  username: string
  createdAt: Date
}

function PostHeader({ inGroup, subreddit, username, createdAt }: TPostHeader) {
  return (
    <Stack direction="row" alignItems="center" sx={{ px: 1 }}>
      {!inGroup && (
        <Link href={`/r/${subreddit}`}>
          <Avatar
            sx={{
              width: 20,
              height: 20,
              mr: 0.5,
              backgroundColor: 'inputBgOutfocused.main'
              // border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
            }}
            alt={subreddit}
            src={generateUserImage(subreddit)}
          />
        </Link>
      )}

      {!inGroup && (
        <Stack direction="row">
          <Link href={`/r/${subreddit}`}>
            <Typography fontWeight={600} color="black">
              r/{subreddit}{' '}
            </Typography>
          </Link>
          <Box mx={0.5}>•</Box>
        </Stack>
      )}
      <Typography variant="caption">
        Posted by{' '}
        <Link href={`/u/${username}`} style={{ color: 'inherit' }}>
          u/{username}
        </Link>{' '}
        {formatDistanceToNow(createdAt, { addSuffix: true })}
      </Typography>
    </Stack>
  )
}

export default PostHeader
