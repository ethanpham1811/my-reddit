import { RdDialog, RdImgLoader } from '@/components'
import { Box } from '@/mui'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

type TPreviewImgDialogProps = {
  zoomDialogOpen: string | null
  setZoomDialogOpen: Dispatch<SetStateAction<string | null>>
}

function ZoomImgDialog({ zoomDialogOpen: zoomedImg, setZoomDialogOpen }: TPreviewImgDialogProps) {
  const [imgLoading, setImgLoading] = useState(true)
  const [imgSize, setImgSize] = useState({ width: '50px', height: '50px' })

  return (
    <RdDialog
      open={!!zoomedImg}
      maxWidth="xl"
      transparent
      onClose={() => {
        setZoomDialogOpen(null)
      }}
      onClick={() => setZoomDialogOpen(null)}
    >
      {imgLoading && <RdImgLoader zIndex={1000} />}

      {/* TODO: using normal img tag due to layout issue with Next Image, will fix later */}
      {zoomedImg && (
        <Box
          sx={{
            opacity: imgLoading ? 0 : 1,
            width: imgSize.width,
            height: imgSize.height,
            maxWidth: (theme) => theme.breakpoints.values.xl,
            maxHeight: '90vh'
          }}
        >
          <Image
            onLoad={({ target }) => {
              const { naturalWidth: w, naturalHeight: h } = target as HTMLImageElement
              setImgSize({ width: w + 'px', height: h + 'px' })
              setImgLoading(false)
            }}
            src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + zoomedImg}
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
