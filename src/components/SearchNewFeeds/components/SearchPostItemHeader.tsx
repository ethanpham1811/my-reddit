import { Avatar, Box, Stack, Typography } from '@/src/mui'
import { customFormatDistance, generateSeededHexColor, generateUserImage } from '@/src/services/utils'
import Link from 'next/link'

type TSearchPostItemHeaderProps = { subName: string; username: string; created_at: Date }

/**
 * Header bar of postItem with "Avatar", "Subname" and "posted by Username"
 */
export default function SearchPostItemHeader({ subName, username, created_at }: TSearchPostItemHeaderProps) {
  return (
    <Stack
      flex={1}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      flexDirection={{ xs: 'column', sm: 'row' }}
      onClick={(e) => e.stopPropagation()}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        {/* Subreddit avatar */}
        <Link href={`r/${subName}`} style={{ color: 'inherit' }}>
          <Avatar
            variant="circular"
            sx={{
              width: { xs: 25, sm: 20 },
              height: { xs: 25, sm: 20 },
              position: { xs: 'relative', sm: 'static' },
              top: { xs: '8px', sm: 'unset' },
              backgroundColor: generateSeededHexColor(subName)
            }}
            alt="subreddit avatar"
            src={generateUserImage(subName)}
          />
        </Link>
        {/* Subreddit name */}
        <Typography fontSize="0.8rem" variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Link href={`/r/${subName}`} style={{ color: 'inherit' }}>
            r/{subName}
          </Link>
        </Typography>
      </Stack>

      {/* Period */}
      <Box display={{ xs: 'none', sm: 'block' }} mx={0.5} color="hintText.main" fontSize="0.8rem">
        •
      </Box>

      {/* Posted by */}
      <Typography fontWeight={400} fontSize="0.8rem" sx={{ ml: { xs: 'calc(25px + 0.5rem)', sm: 0 }, flex: 'auto', color: 'hintText.main' }}>
        Posted by{' '}
        <Link href={`/u/${username}`} style={{ color: 'inherit' }}>
          {username}
        </Link>{' '}
        {customFormatDistance(new Date(created_at))}
      </Typography>
    </Stack>
  )
}
