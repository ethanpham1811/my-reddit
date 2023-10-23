import { RdImageCarousel } from '@/components'
import { parseHtml } from '@/services'
import { Box, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import PostHeader from '../components/PostHeader'

type TPostColumnProps = {
  loadedInSubPage: boolean | undefined
  subName: string
  username: string
  createdAt: Date
  title: string
  body: string
  link: string
  linkDescription: string
  setZoomDialogOpen: Dispatch<SetStateAction<boolean>>
  setZoomedImg: Dispatch<SetStateAction<string | null>>
  images: string[] | undefined
}

function PostColumn({
  loadedInSubPage,
  subName,
  username,
  createdAt,
  title,
  body,
  link,
  linkDescription,
  setZoomDialogOpen,
  setZoomedImg,
  images
}: TPostColumnProps) {
  return (
    <Box flex={1} ml={1} pl={1}>
      {/* post Header */}
      <PostHeader loadedInSubPage={loadedInSubPage} subName={subName} username={username} createdAt={createdAt} />
      {/* post content */}
      <Box p={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" fontWeight={400} fontSize="1rem">
          {body ? parseHtml(body) : linkDescription}
        </Typography>
        {link && <Box>{link}</Box>}
        {/* {link && <LinkPreview url={link} width="400px" />} */}
      </Box>
      {/* image carousel */}
      {images && <RdImageCarousel setZoomDialogOpen={setZoomDialogOpen} setZoomedImg={setZoomedImg} width="100%" height="300px" imgList={images} />}
    </Box>
  )
}

export default PostColumn
