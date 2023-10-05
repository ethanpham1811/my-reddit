import { Skeleton, Stack } from '@mui/material'

export function RdSkeleton() {
  return (
    <Stack px={1} gap={1}>
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height="25px" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height="25px" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height="25px" />
    </Stack>
  )
}
