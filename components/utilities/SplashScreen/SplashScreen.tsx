import { Box, Paper } from '@mui/material'
import { Jelly } from '@uiball/loaders'

const SplashScreen = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}
    >
      <Box display="flex" justifyContent="center" py={4} flexDirection="column" gap={2}>
        <Jelly size={40} speed={0.7} color="#ff4500" />
      </Box>
    </Paper>
  )
}

export default SplashScreen
