import { useDarkMode } from '@/src/Layouts/MuiProvider'
import { RdImgLoader } from '@/src/components'
import { MAX_NEW_FEEDS_POST_HEIGHT } from '@/src/constants/enums'
import { Box, Stack, Typography } from '@/src/mui'
import { blurBottomStyle } from '@/src/mui/styles'
import { parseHtml } from '@/src/services/utils'
import Image from 'next/image'
import { RefObject, useEffect, useState } from 'react'

type TSearchPostItemBodyProps = {
  title: string
  body: string
  images: string[] | undefined
  id: number
  parentRef: RefObject<HTMLDivElement>
}

function SearchPostItemBody({ id, title, body, images, parentRef }: TSearchPostItemBodyProps) {
  const { mode } = useDarkMode()
  const [imgLoading, setImgLoading] = useState(true)
  const [blurredBottomStyle, setBlurredBottomStyle] = useState({})

  /* if a post's height > 200px => blur out the overflow bottom part */
  useEffect(() => {
    if (!parentRef?.current) return

    const wrapperHeight = parentRef?.current?.offsetHeight
    const isHeightExceeded = wrapperHeight && wrapperHeight >= MAX_NEW_FEEDS_POST_HEIGHT

    setBlurredBottomStyle(isHeightExceeded ? blurBottomStyle('80px', mode) : {})
  }, [parentRef, mode])

  return (
    <Stack direction="row" spacing={1}>
      <Stack flex={1}>
        <Typography variant="h6" sx={{ color: 'black.main' }}>
          {title}
        </Typography>
        <Typography fontSize="0.8rem" sx={{ pb: 5, color: 'gray.dark', ...blurredBottomStyle }}>
          {parseHtml(body)}
        </Typography>
      </Stack>

      {/* first image of the post */}
      {images && (
        <Box width="140px" position="relative">
          {imgLoading && <RdImgLoader />}
          <Image
            onLoad={() => setImgLoading(false)}
            style={{ objectFit: 'cover', marginTop: '8px' }}
            alt={`post_ ${id}_preview_image`}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL}/${images[0]}`}
            width={140}
            height={100}
          />
        </Box>
      )}
    </Stack>
  )
}

export default SearchPostItemBody
