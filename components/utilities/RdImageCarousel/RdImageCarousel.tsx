import { ArrowBackIosIcon, ArrowForwardIosIcon } from '@/constants/icons'
import { TRdImageCarouselProps } from '@/constants/types'
import { Paper } from '@mui/material'
import Image from 'next/image'
import { memo } from 'react'
import Carousel from 'react-material-ui-carousel'

function RdImageCarousel({ width, height, imgList, setZoomedImg }: TRdImageCarouselProps) {
  function zoomImage(e: any, imgSrc: string) {
    e.stopPropagation()
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
        height={300}
        indicators={imgList.length > 1}
        fullHeightHover={false}
        sx={{ width }}
        animation="slide"
        navButtonsAlwaysVisible={imgList.length > 1}
        autoPlay={false}
      >
        {imgList.map((imgSrc, i) => (
          <Paper key={`image_${imgSrc}`} sx={{ boxShadow: 'none' }}>
            <Image
              src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + imgSrc}
              alt={'post image'}
              sizes="(min-width: 768px) 600px, 900px"
              style={{ width, height, objectFit: 'contain', cursor: 'zoom-in' }}
              width={300}
              height={200}
              loading="lazy"
              onClick={(e) => zoomImage(e, imgSrc)}
            />
          </Paper>
        ))}
      </Carousel>
    </>
  )
}

export default memo(RdImageCarousel, (prev, next) => prev?.imgList?.length === next?.imgList?.length)
