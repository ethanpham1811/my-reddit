import { RdDialog, RdImgLoader } from '@/components'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TPreviewImgDialogProps = {
  zoomDialogOpen: string | null
  setZoomDialogOpen: Dispatch<SetStateAction<string | null>>
}

function ZoomImgDialog({ zoomDialogOpen: zoomedImg, setZoomDialogOpen }: TPreviewImgDialogProps) {
  const [imgLoading, setImgLoading] = useState(true)

  // refresh loading state when new img come in
  useEffect(() => {
    setImgLoading(true)
  }, [zoomedImg])

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
        <img
          onLoad={() => setImgLoading(false)}
          src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + zoomedImg}
          alt={'zoomed image'}
          style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        />
      )}
    </RdDialog>
  )
}

export default ZoomImgDialog
