import { ImageList, ImageListItem, Stack } from '@/src/mui'
import { ImageListOwnProps } from '@mui/material/ImageList'
import Image from 'next/image'
import { memo } from 'react'
import { v4 as rid } from 'uuid'

type TRdImageListProps = Omit<ImageListOwnProps, 'children'> & {
  images: FileList
}

function RdImageList({ images, ...rest }: TRdImageListProps) {
  const imageList = Array.from(images)
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      width="100%"
      sx={{ p: 1, borderRadius: '4px', border: (theme) => `1px dashed ${theme.palette.blue.main}` }}
    >
      <ImageList
        {...rest}
        sx={{
          alignItems: 'center'
        }}
      >
        {imageList.map((item, i) => (
          <ImageListItem key={`uploaded_img_${rid()}`}>
            <Image
              src={URL.createObjectURL(item)}
              alt={`uploaded image ${i}`}
              aria-label={`uploaded_img_${rid()}`}
              style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'contain' }}
              width={100}
              height={100}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  )
}

export default memo(RdImageList, (prev, next) => prev.images == next.images)
