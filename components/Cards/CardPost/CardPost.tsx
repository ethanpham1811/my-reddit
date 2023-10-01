import { RdCard, RdImageCarousel } from '@/components'
import { generateUserImage } from '@/components/utilities'
import { ArrowDownwardOutlinedIcon, ArrowUpwardOutlinedIcon } from '@/constants/icons'
import { TCardPostProps, TImage } from '@/constants/types'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ReactHtmlParser from 'react-html-parser'

function CardPost({ images, body, title, username, createdAt, upvote, subreddit, comment }: TCardPostProps) {
  const imgList: TImage[] = [
    {
      imgSrc:
        process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL +
        'post_images/Realtime%20Chat%20Application%20using%20PHP%20with%20MySQL%20&%20JavaScript%20Ajax.jpg',
      caption: 'Scenery 1'
    },
    {
      imgSrc: process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + 'post_images/wallpaperflare.com_wallpaper.jpg',
      caption: 'Scenery 2'
    }
  ]

  return (
    <RdCard>
      <Stack direction="row">
        <Box width={40} m={-1} py={1} bgcolor="inputBgOutfocused.main">
          <Stack alignItems="center">
            <IconButton>
              <ArrowUpwardOutlinedIcon />
            </IconButton>
            <Typography>{upvote}</Typography>
            <IconButton>
              <ArrowDownwardOutlinedIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box flex={1} ml={1} pl={1}>
          <Stack direction="row" alignItems="center">
            <Avatar
              sx={{
                width: 20,
                height: 20,
                backgroundColor: 'inputBgOutfocused.main'
                // border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
              }}
              alt={username}
              src={generateUserImage(username)}
            />

            <Typography variant="caption">
              <a href="">
                <Typography fontWeight={600} color="black">
                  r/{subreddit}{' '}
                </Typography>
              </a>
              • Posted by{' '}
              <a href="#" style={{ color: 'inherit' }}>
                u/{username}
              </a>{' '}
              {formatDistanceToNow(createdAt)}
            </Typography>
          </Stack>
          <Box p={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{ReactHtmlParser(body)}</Typography>
          </Box>
          {images && <RdImageCarousel width="100%" height="300px" imgList={imgList} />}
        </Box>
      </Stack>
    </RdCard>
  )
}

export default CardPost
