import { TFetchMoreArgs } from '@/constants/types'
import { Box, Stack, Typography } from '@/mui'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import { Jelly } from '@uiball/loaders'
import { useEffect, useRef, useState } from 'react'

type TRdInfiniteScrollProps<T> = {
  fetchMore: FetchMoreFunction<{ [key: string]: T[] }, TFetchMoreArgs>
  limit: number
  list: T[] | null
  appendPosts: (prev: {}, fetchMoreResult: {}) => {}
}

const RdInfiniteScroll = <T extends {}>({ fetchMore, limit, list, appendPosts }: TRdInfiniteScrollProps<T>) => {
  const curListLength = list?.length || 0
  const [offset, setOffset] = useState<number>(curListLength) // offset start at the index of the last item of current list
  const [loading, setLoading] = useState(false)
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
            return appendPosts(prev, fetchMoreResult)
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
  }, [ref, fetchMore, offset, loading, limit, curListLength, appendPosts])

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
