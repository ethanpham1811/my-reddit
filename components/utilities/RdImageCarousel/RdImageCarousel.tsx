import { ArrowBackIosIcon, ArrowForwardIosIcon } from '@/constants/icons'
import { TRdImageCarouselProps } from '@/constants/types'
import { Paper } from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { v4 as rid } from 'uuid'

function RdImageCarousel({ width, height, imgList, setZoomDialogOpen, setZoomedImg }: TRdImageCarouselProps) {
  function zoomImage(e: any, imgSrc: string) {
    e.stopPropagation()
    setZoomDialogOpen(true)
    setZoomedImg(imgSrc)
  }
  return (
    <>
      <Carousel
        NextIcon={<ArrowForwardIosIcon sx={{ color: 'actionIcon.main' }} />}
        PrevIcon={<ArrowBackIosIcon sx={{ color: 'actionIcon.main' }} />}
        navButtonsProps={{
          style: {
            backgroundColor: '#fff'
          }
        }}
        indicatorContainerProps={{
          style: {
            marginTop: 0
          }
        }}
        indicators={imgList.length > 1}
        fullHeightHover={false}
        sx={{ width }}
        animation="slide"
        navButtonsAlwaysVisible={imgList.length > 1}
        autoPlay={false}
      >
        {imgList.map((imgSrc, i) => (
          <Paper key={`image_${rid()}`} sx={{ boxShadow: 'none' }}>
            <Image
              src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + imgSrc}
              alt={'post image'}
              sizes="(min-width: 768px) 600px, 900px"
              style={{ width, height, objectFit: 'contain', cursor: 'zoom-in' }}
              width={300}
              height={200}
              onClick={(e) => zoomImage(e, imgSrc)}
            />
          </Paper>
        ))}
      </Carousel>
    </>
  )
}

export default RdImageCarousel
