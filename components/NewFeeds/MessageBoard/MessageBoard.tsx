import { Box, Typography } from '@mui/material'

function MessageBoard({ message }: { message: string }) {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="body1" color="initial" fontWeight={400}>
        {message}
      </Typography>
    </Box>
  )
}

export default MessageBoard
