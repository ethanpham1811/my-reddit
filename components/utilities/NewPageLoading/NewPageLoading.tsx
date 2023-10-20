import { Box, Paper } from '@mui/material'

const NewPageLoading = () => {
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
        New page is being generated, please wait...
      </Box>
    </Paper>
  )
}

export default NewPageLoading
