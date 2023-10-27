import { RdDialog } from '@/components'
import { Dispatch, SetStateAction } from 'react'

type TPreviewImgDialogProps = {
  zoomDialogOpen: string | null
  setZoomDialogOpen: Dispatch<SetStateAction<string | null>>
}

function ZoomImgDialog({ zoomDialogOpen: zoomedImg, setZoomDialogOpen }: TPreviewImgDialogProps) {
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
      {zoomedImg && (
        <img
          src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + zoomedImg}
          alt={'zoomed image'}
          style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        />
      )}
    </RdDialog>
  )
}

export default ZoomImgDialog
