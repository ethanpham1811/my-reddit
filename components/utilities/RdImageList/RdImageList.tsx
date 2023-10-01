import { ImageList, ImageListItem, Stack } from '@mui/material'
import Image from 'next/image'
import { v4 as rid } from 'uuid'

type TRdImageListProps = {
  images: FileList
}

function RdImageList({ images }: TRdImageListProps) {
  const imageList = Array.from(images)
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      width="100%"
      sx={{ p: 1, borderRadius: '4px', border: (theme) => `1px dashed ${theme.palette.blue.main}` }}
    >
      <ImageList cols={5}>
        {imageList.map((item, i) => (
          <ImageListItem key={`uploaded_img_${rid()}`}>
            <Image
              src={URL.createObjectURL(item)}
              alt={`uploaded image ${i}`}
              aria-label={`uploaded_img_${rid()}`}
              style={{ width: '100%', objectFit: 'cover' }}
              width={100}
              height={100}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  )
}

export default RdImageList
