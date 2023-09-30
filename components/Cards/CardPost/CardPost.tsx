import { RdCard, RdImageCarousel } from '@/components'
import { generateUserImage } from '@/components/utilities'
import { ArrowDownwardOutlinedIcon, ArrowUpwardOutlinedIcon } from '@/constants/icons'
import { TImage, TUser } from '@/constants/types'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

type TPost = {
  images?: TImage[]
  body: string
  title: string
  user: TUser
  createdAt: Date
  upvote: number
  subreddit: string
}

function CardPost({ images, body, title, user, createdAt, upvote, subreddit }: TPost) {
  return (
    <RdCard>
      <Stack direction="row">
        <Box width={40} m={-1} py={1} bgcolor="inputBgOutfocused.main">
          <Stack alignItems="center">
            <ArrowUpwardOutlinedIcon />
            <Typography>{upvote}</Typography>
            <ArrowDownwardOutlinedIcon />
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
              alt={user.name}
              src={generateUserImage(user.image ?? user.name)}
            />

            <Typography variant="caption">
              <a href="">
                <Typography fontWeight={600} color="black">
                  r/{subreddit}{' '}
                </Typography>
              </a>
              • Posted by{' '}
              <a href="#" style={{ color: 'inherit' }}>
                u/{user.name}
              </a>{' '}
              {formatDistanceToNow(createdAt)}
            </Typography>
          </Stack>
          <Box p={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{body}</Typography>
          </Box>
          {images && <RdImageCarousel width="100%" height="300px" imgList={images} />}
        </Box>
      </Stack>
    </RdCard>
  )
}

export default CardPost
