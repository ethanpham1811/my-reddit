import { ArrowBackIosIcon, ArrowForwardIosIcon } from '@/constants/icons'
import { Paper } from '@/mui'
import { Dispatch, MouseEvent, SetStateAction, memo } from 'react'
import Carousel from 'react-material-ui-carousel'
import DisplayImage from './components/DisplayImage'

type TRdImageCarouselProps = {
  width: string
  height: string
  imgList: string[]
  setZoomedImg: Dispatch<SetStateAction<string | null>>
}
function RdImageCarousel({ width, height, imgList, setZoomedImg }: TRdImageCarouselProps) {
  function zoomImage(e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>, imgSrc: string) {
    e.stopPropagation()
    setZoomedImg(imgSrc)
  }

  return (
    <>
      <Carousel
        NextIcon={<ArrowForwardIosIcon sx={{ color: 'actionIcon.main' }} />}
        PrevIcon={<ArrowBackIosIcon sx={{ color: 'actionIcon.main' }} />}
        height={300}
        indicators={imgList.length > 1}
        fullHeightHover={false}
        sx={{ width }}
        animation="slide"
        navButtonsAlwaysVisible={imgList.length > 1}
        autoPlay={false}
        navButtonsProps={{
          style: {
            backgroundColor: 'white.main'
          }
        }}
        indicatorContainerProps={{
          style: {
            marginTop: 0
          }
        }}
      >
        {imgList.map((imgSrc) => (
          <Paper key={`image_${imgSrc}`} sx={{ boxShadow: 'none' }}>
            <DisplayImage width={width} height={height} imgSrc={imgSrc} zoomImage={zoomImage} />
          </Paper>
        ))}
      </Carousel>
    </>
  )
}

export default memo(RdImageCarousel, (prev, next) => prev?.imgList?.length === next?.imgList?.length)
