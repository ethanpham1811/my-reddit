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
export function RdSkeletonListItem({ key }: { key: string }) {
  return (
    <Stack height={400} py={2} gap={1} key={`loading_ske_${key}`}>
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="60%" height="25px" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="80%" height="12px" />
      <Skeleton sx={{ display: 'flex', flex: 1 }} variant="rectangular" width="100%" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="30%" height="12px" />
    </Stack>
  )
}
