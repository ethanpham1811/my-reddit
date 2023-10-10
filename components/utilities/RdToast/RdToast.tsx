import { Box, Typography } from '@mui/material'

function RdToast({ message }: { message: string }) {
  return (
    <Box>
      <Typography>{message}</Typography>
    </Box>
  )
}

export default RdToast
