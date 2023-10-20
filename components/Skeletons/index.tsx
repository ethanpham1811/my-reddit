import { Skeleton, Stack } from '@mui/material'

export function RdSkeleton({ height = '25px' }: { height?: string }) {
  return (
    <Stack px={1} gap={1}>
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height={height} />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height={height} />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height={height} />
    </Stack>
  )
}
export function RdSkeletonListItem({ index }: { index: string }) {
  return (
    <Stack height={400} py={2} gap={1} key={`loading_ske_${index}`}>
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="60%" height="25px" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="80%" height="12px" />
      <Skeleton sx={{ display: 'flex', flex: 1 }} variant="rectangular" width="100%" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="30%" height="12px" />
    </Stack>
  )
}
