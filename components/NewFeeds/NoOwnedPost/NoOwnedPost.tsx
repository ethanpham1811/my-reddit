import { Box, Typography } from '@mui/material'

function NoOwnedPost() {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="body1" color="initial" fontWeight={400}>
        This user has no post
      </Typography>
    </Box>
  )
}

export default NoOwnedPost
