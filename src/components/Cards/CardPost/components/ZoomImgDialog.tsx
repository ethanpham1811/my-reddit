import { RdDialog, RdImgLoader } from '@/src/components'
import { Box } from '@/src/mui'
import { Events, eventEmitter } from '@/src/services/eventEmitter'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function ZoomImgDialog() {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [imgLoading, setImgLoading] = useState(true)
  const [imgSize, setImgSize] = useState({ width: '50px', height: '50px' })

  useEffect(() => {
    eventEmitter.subscribe(Events.OPEN_IMAGE_PREVIEW, (url) => setImgUrl(url as string))
  }, [])

  return (
    <RdDialog
      open={!!imgUrl}
      maxWidth="xl"
      transparent
      sx={{ '.MuiDialog-paperScrollPaper': { overflow: 'hidden' } }}
      onClose={() => {
        setImgUrl(null)
      }}
      onClick={() => setImgUrl(null)}
    >
      {imgLoading && <RdImgLoader zIndex={1000} />}

      {/* TODO: using normal img tag due to layout issue with Next Image, will fix later */}
      {imgUrl && (
        <Box
          sx={{
            opacity: imgLoading ? 0 : 1,
            width: imgSize.width,
            height: imgSize.height,
            maxWidth: (theme) => theme.breakpoints.values.xl,
            maxHeight: '90dvh'
          }}
        >
          <Image
            onLoad={({ target }) => {
              const { naturalWidth: w, naturalHeight: h } = target as HTMLImageElement
              setImgSize({ width: w + 'px', height: h + 'px' })
              setImgLoading(false)
            }}
            src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + imgUrl}
            alt={'zoomed image'}
            layout="fill"
            objectFit="contain"
          />
        </Box>
      )}
    </RdDialog>
  )
}

export default ZoomImgDialog
