import { ArrowBackIosIcon, ArrowForwardIosIcon } from '@/src/constants/icons'
import { Paper, useTheme } from '@/src/mui'
import { Dispatch, SetStateAction, memo } from 'react'
import Carousel from 'react-material-ui-carousel'
import DisplayImage from './components/DisplayImage'

type TRdImageCarouselProps = {
  width: string
  height: string
  imgList: string[]
  setZoomedImg: Dispatch<SetStateAction<string | null>>
}
function RdImageCarousel({ width, height, imgList, setZoomedImg }: TRdImageCarouselProps) {
  const theme = useTheme()

  return (
    <>
      <Carousel
        NextIcon={<ArrowForwardIosIcon sx={{ color: 'actionIcon.main' }} />}
        PrevIcon={<ArrowBackIosIcon sx={{ color: 'actionIcon.main', position: 'relative', left: '4px' }} />}
        height={300}
        indicators={imgList.length > 1}
        fullHeightHover={false}
        sx={{ width }}
        animation="slide"
        autoPlay={false}
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            display: imgList.length > 1 ? 'flex' : 'none',
            backgroundColor: theme.palette.white.main
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
            <DisplayImage width={width} height={height} imgSrc={imgSrc} zoomImage={setZoomedImg} />
          </Paper>
        ))}
      </Carousel>
    </>
  )
}

export default memo(RdImageCarousel, (prev, next) => prev?.imgList?.length === next?.imgList?.length)
