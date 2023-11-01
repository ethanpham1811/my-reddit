import { RdDialog } from '@/components'
import { Box, CircularProgress } from '@mui/material'
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
      {imgLoading && (
        <Box zIndex={1000} position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)' }}>
          <CircularProgress size={20} sx={{ color: 'orange.main' }} />
        </Box>
      )}

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
