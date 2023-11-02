import { Box, CircularProgress } from '@mui/material'

function RdImgLoader({ zIndex }: { zIndex?: number }) {
  return (
    <Box zIndex={zIndex} position="absolute" top="50%" left="50%" bgcolor="transparent" sx={{ transform: 'translate(-50%, -50%)' }}>
      <CircularProgress size={20} sx={{ color: 'orange.main' }} />
    </Box>
  )
}

export default RdImgLoader
