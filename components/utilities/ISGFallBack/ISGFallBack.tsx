import { Box, Paper } from '@mui/material'

const ISGFallBack = () => {
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

export default ISGFallBack

{
  /* <Container maxWidth="md" sx={{ pt: '70px', pb: 5 }}>
<Box>
  <Grid container spacing={3}>
    <Grid xs={16} md={8} item>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" width="100%" height="60px" />
        <Skeleton variant="rectangular" width="100%" height="60px" />
        {[0, 1].map((el) => (
          <Fragment key={`skeleton_${el}`}>
            <RdSkeletonListItem py={0} index={el.toString()} />
          </Fragment>
        ))}
      </Stack>
    </Grid>
    <Grid xs={16} md={4} item>
      <RdSkeletonSideColumn />
    </Grid>
  </Grid>
</Box>
</Container> */
}
