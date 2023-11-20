import { RdImgLoader } from '@/src/components'
import { Box, Stack, Typography } from '@/src/mui'
import { parseHtml } from '@/src/services/utils'
import Image from 'next/image'
import { useState } from 'react'

type TSearchPostItemBodyProps = {
  title: string
  body: string
  images: string[] | undefined
  id: number
  bottomStyle: {}
}

function SearchPostItemBody({ id, title, body, images, bottomStyle }: TSearchPostItemBodyProps) {
  const [imgLoading, setImgLoading] = useState(true)

  return (
    <Stack direction="row" spacing={1}>
      <Stack flex={1}>
        <Typography variant="h6" sx={{ color: 'black.main' }}>
          {title}
        </Typography>
        <Typography fontSize="0.8rem" sx={{ pb: 5, color: 'hintText.main', ...bottomStyle }}>
          {parseHtml(body)}
        </Typography>
      </Stack>
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
