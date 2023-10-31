import { RdImageCarousel } from '@/components'
import { blurBottomStyle } from '@/mui/styles'
import { parseHtml } from '@/services'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { Dispatch, SetStateAction, useRef } from 'react'
import PostHeader from '../components/PostHeader'

type TPostColumnProps = {
  subName: string
  username: string
  createdAt: Date
  title: string
  body: string
  link: string
  linkDescription: string
  setZoomedImg: Dispatch<SetStateAction<string | null>>
  images: string[] | undefined
}

function PostColumn({ subName, username, createdAt, title, body, link, linkDescription, setZoomedImg, images }: TPostColumnProps) {
  /* if a post's height > 200px => blur out the overflow bottom part */
  const ref = useRef<HTMLDivElement>(null)
  const bottomStyle = ref?.current?.offsetHeight && ref?.current?.offsetHeight >= 200 ? blurBottomStyle : {}

  return (
    <Box flex={1} ml={1} pl={1}>
      {/* post Header */}
      <PostHeader subName={subName} username={username} createdAt={createdAt} />
      {/* post content */}
      <Box p={1} ref={ref} sx={{ position: 'relative', maxHeight: '220px', overflow: 'hidden' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" fontWeight={400} fontSize="1rem" sx={{ ...bottomStyle }}>
          {body ? parseHtml(body) : parseHtml(`<p>${linkDescription}</p>`)}
        </Typography>
      </Box>

      {/* TODO: link preview: {link && <LinkPreview url={link} width="400px" />} */}
      {link && (
        <Box py={1} px={2} bgcolor="inputBgOutfocused.main" borderRadius="4px">
          <Link onClick={(e) => e.stopPropagation()} href={link} target="_blank" style={{ textDecoration: 'none' }}>
            {link}
          </Link>
        </Box>
      )}

      {/* image carousel */}
      {images && <RdImageCarousel setZoomedImg={setZoomedImg} width="100%" height="300px" imgList={images} />}
    </Box>
  )
}

export default PostColumn
