import { Box, CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

type TDisplayImage = { width: string; height: string; imgSrc: string; zoomImage: (e: any, imgSrc: string) => void }

function DisplayImage({ width, height, imgSrc, zoomImage }: TDisplayImage) {
  const [imgLoading, setImgLoading] = useState(true)

  return (
    <>
      {imgLoading && (
        <Box position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)' }}>
          <CircularProgress size={20} sx={{ color: 'orange.main' }} />
        </Box>
      )}

      <Image
        onLoad={() => setImgLoading(false)}
        src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + imgSrc}
        alt={'post image'}
        sizes="(min-width: 768px) 600px, 900px"
        style={{ width, height, objectFit: 'contain', cursor: 'zoom-in' }}
        width={300}
        height={200}
        loading="lazy"
        onClick={(e) => zoomImage(e, imgSrc)}
      />
    </>
  )
}

export default DisplayImage
