import { RdDialog } from '@/components'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

type TPreviewImgDialogProps = {
  zoomDialogOpen: boolean
  setZoomDialogOpen: Dispatch<SetStateAction<boolean>>
  setZoomedImg: Dispatch<SetStateAction<string | null>>
  zoomedImg: string | null
}

function PreviewImgDialog({ zoomDialogOpen, setZoomDialogOpen, setZoomedImg, zoomedImg }: TPreviewImgDialogProps) {
  return (
    <RdDialog
      open={zoomDialogOpen}
      maxWidth="xl"
      transparent
      onClose={() => {
        setZoomDialogOpen(false)
        setZoomedImg(null)
      }}
    >
      {zoomedImg && (
        <Image
          src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + zoomedImg}
          alt={'zoomed image'}
          sizes="(min-width: 1024px) 900px, 1800px"
          style={{
            objectFit: 'contain',
            width: '100%'
          }}
          width={1800}
          height={500}
        />
      )}
    </RdDialog>
  )
}

export default PreviewImgDialog
