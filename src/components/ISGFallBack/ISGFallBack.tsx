import { Box, Paper } from '@/src/mui'

/**
 * White fullscreen white fixed div with text in middle
 * Only show if the destination route is not generated with ISG in server
 * (currently not using this)
 */
const ISGFallBack = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white.main'
      }}
    >
      <Box display="flex" justifyContent="center" py={4} flexDirection="column" gap={2}>
        New page is being generated, please wait...
      </Box>
    </Paper>
  )
}

export default ISGFallBack
