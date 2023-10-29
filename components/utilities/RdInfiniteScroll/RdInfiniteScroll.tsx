import { TFetchMoreArgs } from '@/constants/types'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import { Box, Stack, Typography } from '@mui/material'
import { Jelly } from '@uiball/loaders'
import { useEffect, useRef, useState } from 'react'

type TRdInfiniteScrollProps<T> = {
  fetchMore: FetchMoreFunction<{ [key: string]: T[] }, TFetchMoreArgs>
  limit: number
  list: T[] | null
  fetchMoreUpdateReturn: (prev: {}, fetchMoreResult: {}) => {}
}

const RdInfiniteScroll = <T extends {}>({ fetchMore, limit, list, fetchMoreUpdateReturn }: TRdInfiniteScrollProps<T>) => {
  const [offset, setOffset] = useState<number>(limit)
  const [loading, setLoading] = useState(false)
  const curListLength = list?.length || 0
  const endOfList: boolean = offset > curListLength
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (offset > curListLength || loading) return

      if (entries[0].isIntersecting) {
        setLoading(true)

        fetchMore({
          variables: { offset: offset || 0 },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev
            return fetchMoreUpdateReturn(prev, fetchMoreResult)
          }
        }).then((_) => {
          setOffset(offset + limit)
          setLoading(false)
        })
      }
    })

    ref && ref.current && observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, fetchMore, offset, loading, limit, curListLength, fetchMoreUpdateReturn])

  return (
    <Stack>
      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <Jelly size={30} speed={0.7} color="#ff4500" />
        </Box>
      ) : endOfList ? (
        <Box display="flex" justifyContent="center">
          <Typography>No more post</Typography>
        </Box>
      ) : (
        <Box ref={ref} sx={{ height: '5px' }}></Box>
      )}
    </Stack>
  )
}

export default RdInfiniteScroll
