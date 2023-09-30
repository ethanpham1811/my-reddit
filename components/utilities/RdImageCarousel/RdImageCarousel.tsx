import { TImage } from '@/constants/types'
import { Paper } from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { v4 as rid } from 'uuid'

type TRdImageCarousel = {
  width: string
  height: string
  imgList: TImage[]
}

function RdImageCarousel({ width, height, imgList }: TRdImageCarousel) {
  return (
    <Carousel sx={{ width, height }} animation="slide" navButtonsAlwaysVisible cycleNavigation={false} autoPlay={false} indicators={false}>
      {imgList.map((item, i) => (
        <Paper key={`image_${rid()}`}>
          <Image src={item.imgSrc} alt={item.caption} sizes="(min-width: 768px) 600px, 900px" style={{ width, height, objectFit: 'contain' }} />
        </Paper>
      ))}
    </Carousel>
  )
}

export default RdImageCarousel
