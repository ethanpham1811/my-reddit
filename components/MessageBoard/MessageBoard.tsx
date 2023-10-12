import { Box, BoxProps, Typography } from '@mui/material'

function MessageBoard({ head, highlight, tail, pt }: BoxProps & { head: string; highlight?: string; tail?: string }) {
  return (
    <Box display="flex" justifyContent="center" pt={pt}>
      <Typography variant="body1" color="initial" fontWeight={400}>
        {head}
        <Typography fontWeight={500} sx={{ color: 'blue.main' }}>
          {highlight}
        </Typography>
        {tail}
      </Typography>
    </Box>
  )
}

export default MessageBoard
