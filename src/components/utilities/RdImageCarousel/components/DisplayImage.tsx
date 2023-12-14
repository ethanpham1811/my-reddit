import { Events, eventEmitter } from '@/src/services/eventEmitter'
import Image from 'next/image'
import { KeyboardEvent, MouseEvent, useState } from 'react'
import RdImgLoader from '../../RdImgLoader/RdImgLoader'

type TDisplayImageProps = {
  width: string
  height: string
  imgSrc: string
}

function DisplayImage({ width, height, imgSrc }: TDisplayImageProps) {
  const [imgLoading, setImgLoading] = useState(true)

  function openPreviewModal(e: MouseEvent<HTMLImageElement> | KeyboardEvent<HTMLImageElement>) {
    e.stopPropagation()
    eventEmitter.dispatch(Events.OPEN_IMAGE_PREVIEW, imgSrc)
  }

  return (
    <>
      {imgLoading && <RdImgLoader />}

      <Image
        tabIndex={0}
        onLoad={() => setImgLoading(false)}
        src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + imgSrc}
        alt={'post image'}
        sizes="(min-width: 768px) 600px, 900px"
        style={{ width, height, objectFit: 'contain', cursor: 'zoom-in' }}
        width={300}
        height={200}
        loading="lazy"
        onClick={openPreviewModal}
        onKeyUp={(e) => e.key === 'Enter' && openPreviewModal(e)}
      />
    </>
  )
}

export default DisplayImage
