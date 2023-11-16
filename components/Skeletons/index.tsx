import { Box, Divider, Skeleton, Stack } from '@/mui'
import { Fragment } from 'react'
import { RdCard } from '..'

export function RdSkeleton({ height = '25px' }: { height?: string }) {
  return (
    <Stack px={1} gap={1}>
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height={height} />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height={height} />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height={height} />
    </Stack>
  )
}
export function RdSkeletonListItem({ index, py = 2 }: { index: string; py?: number }) {
  return (
    <Stack height={400} py={py} gap={1} key={`loading_ske_${index}`}>
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="60%" height="25px" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="80%" height="12px" />
      <Skeleton sx={{ display: 'flex', flex: 1 }} variant="rectangular" width="100%" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="30%" height="12px" />
    </Stack>
  )
}

export function RdSkeletonSideColumn() {
  return (
    <>
      <Skeleton sx={{ display: 'flex', mb: 2 }} variant="rectangular" width="100%" height="100px" />
      <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="100%" height="200px" />
    </>
  )
}
export function RdSkeletonTextEditor({ height }: { height: number }) {
  return (
    <Box position="absolute" width="100%" height={height}>
      <Skeleton variant="text" width="100%" height="39px" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" width="100%" height={height - 60 + 'px'} />
      <Skeleton variant="text" width="100%" height="19px" sx={{ fontSize: '1rem' }} />
    </Box>
  )
}
export function RdSkeletonDoublePost() {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height="60px" />
      <Skeleton variant="rectangular" width="100%" height="60px" />
      {[0, 1].map((el) => (
        <Fragment key={`skeleton_${el}`}>
          <RdSkeletonListItem py={0} index={el.toString()} />
        </Fragment>
      ))}
    </>
  )
}
export function RdSearchPostSkeleton(count: number = 1) {
  return (
    <RdCard sx={{ p: 0 }}>
      <Stack gap="1px">
        {Array.from({ length: count }).map((_, i) => (
          <>
            <Stack key={`skeleton_search_feed_${i}`} gap={2} px={3} py={2}>
              <Stack flexDirection="row" gap={1} alignItems="center">
                <Skeleton variant="circular" width="25px" height="25px" />
                <Skeleton sx={{ display: 'flex' }} variant="rectangular" width="35%" height="20px" />
              </Stack>

              <Stack flexDirection="row" gap={1} alignItems="center">
                <Stack gap={0.5} flex={1}>
                  <Skeleton variant="rectangular" width="70%" height="20px" />
                  <Skeleton sx={{ display: 'flex' }} variant="rectangular" height="120px" />
                </Stack>
              </Stack>
            </Stack>
            <Divider />
          </>
        ))}
      </Stack>
    </RdCard>
  )
}
export function RdSearchPeopleSubSkeleton(count: number = 1) {
  return (
    <RdCard sx={{ p: 0 }}>
      <Stack gap="1px">
        {Array.from({ length: count }).map((_, i) => (
          <>
            <Stack height="75px" key={`skeleton_search_feed_${i}`} flexDirection="row" px={3} gap={1} alignItems="center">
              <Skeleton variant="circular" width="40px" height="40px" />
              <Stack gap={0.5} flex={1}>
                <Skeleton sx={{ display: 'flex', minWidth: '100px' }} variant="rectangular" width="15%" height="15px" />
                <Skeleton sx={{ display: 'flex', minWidth: '130px' }} variant="rectangular" width="20%" height="10px" />
              </Stack>
              <Skeleton variant="rectangular" sx={{ borderRadius: 999 }} width="80px" height="30px" />
            </Stack>
            <Divider />
          </>
        ))}
      </Stack>
    </RdCard>
  )
}
