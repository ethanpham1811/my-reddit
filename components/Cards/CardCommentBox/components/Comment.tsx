import { customFormatDistance, parseHtml } from '@/services'
import { Box, Link, Stack, Typography } from '@mui/material'

function Comment({ username, created_at, text }: { username: string; created_at: Date; text: string }) {
  return (
    <Stack sx={{ ml: 1, pl: 1 }}>
      <Stack direction="row">
        <Typography sx={{ color: 'black.main' }}>
          <Link href={`/u/${username}`} style={{ color: 'inherit' }}>
            {username}
          </Link>
        </Typography>
        <Box mx={0.5} color="hintText.main" fontSize="0.8rem">
          •
        </Box>
        <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'hintText.main', p: { my: '2px', bgcolor: 'red' } }}>
          {customFormatDistance(new Date(created_at))}
        </Typography>
      </Stack>
      <Typography className="parsed-html" fontWeight={400} fontSize="1rem">
        {parseHtml(text)}
      </Typography>
    </Stack>
  )
}

export default Comment
