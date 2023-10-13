import { customFormatDistance, generateSeededHexColor, generateUserImage } from '@/services'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'

type TSearchPostItemHeaderProps = { subName: string; username: string; created_at: Date }

export default function SearchPostItemHeader({ subName, username, created_at }: TSearchPostItemHeaderProps) {
  return (
    <Stack flex={1} direction="row" alignItems="center">
      <Link href={`u/${subName}`} style={{ color: 'inherit' }}>
        <Avatar
          variant="circular"
          sx={{
            width: 30,
            height: 30,
            ml: '-4px',
            backgroundColor: generateSeededHexColor(subName),
            border: (theme): string => `4px solid ${theme.palette.white.main}`
          }}
          src={generateUserImage(subName)}
        />
      </Link>
      <Typography fontSize="0.8rem" variant="h6" sx={{ flex: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', width: '30px' }}>
        <Link href={`/r/${subName}`} style={{ color: 'inherit' }}>
          {subName}
        </Link>
      </Typography>
      <Box mx={0.5} color="hintText.main" fontSize="0.8rem">
        •
      </Box>
      <Typography fontWeight={400} fontSize="0.8rem" sx={{ flex: 'auto', color: 'hintText.main', p: { my: '2px', bgcolor: 'red' } }}>
        Posted by{' '}
        <Link href={`/u/${username}`} style={{ color: 'inherit' }}>
          {username}
        </Link>{' '}
        {customFormatDistance(new Date(created_at))}
      </Typography>
    </Stack>
  )
}