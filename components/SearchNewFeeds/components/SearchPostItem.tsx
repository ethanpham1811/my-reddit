import { TQueriedPost } from '@/constants/types'
import { blurBottomStyle, postHoverStyle } from '@/mui/styles'

import { getTotalUpvote, parseHtml } from '@/services'
import { Box, Divider, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useRef } from 'react'
import SearchPostItemHeader from './SearchPostItemHeader'

function SearchPostItem({ item }: { item: TQueriedPost }) {
  const { push: navigate } = useRouter()
  const {
    id,
    title,
    body,
    created_at,
    subreddit: { name: subName },
    user: { username },
    vote,
    comment,
    images
  } = item
  // const status = me ? validatePostByFollowing(me?.following_ids, username) : false
  const ref = useRef<HTMLDivElement>(null)

  /* navigate to post detail page */
  const goToPost = () => navigate(`/r/${subName}/post/${id}`)

  /* if an item > 200px => add blur bottom effect */
  const bottomStyle = ref?.current?.offsetHeight && ref?.current?.offsetHeight >= 200 ? blurBottomStyle : {}

  return (
    <Fragment key={`post_${id}_search_result`}>
      <Stack
        ref={ref}
        spacing={1}
        py={2}
        px={3}
        alignContent="flex-start"
        onClick={goToPost}
        sx={{
          position: 'relative',
          maxHeight: '220px',
          overflow: 'hidden',
          border: '1px solid transparent',
          ...postHoverStyle()
        }}
      >
        <SearchPostItemHeader subName={subName} username={username} created_at={created_at} />
        <Stack direction="row">
          <Stack flex={1}>
            <Typography variant="h6" sx={{ color: 'black.main' }}>
              {title}
            </Typography>
            <Typography fontSize="0.8rem" sx={{ pb: 5, color: 'hintText.main', ...bottomStyle }}>
              {parseHtml(body)}
            </Typography>
          </Stack>
          {images && (
            <Box width="140px">
              <Image
                style={{ border: '1px solid black ', objectFit: 'cover' }}
                alt={`post_ ${id}_preview_image`}
                src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL}/${images[0]}`}
                width={140}
                height={100}
              />
            </Box>
          )}
        </Stack>
        {/* upvote & comment count */}
        <Stack direction="row" sx={{ bgcolor: 'white.main', position: 'absolute', left: 0, bottom: 0, width: '100%', pl: 3, pb: 1.5 }}>
          <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'hintText.main', mr: 2 }}>
            {vote ? getTotalUpvote(vote) : 0} upvotes
          </Typography>
          <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
            {comment ? comment.length : 0} comments
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: 'inputBorder.main' }} />
    </Fragment>
  )
}

export default SearchPostItem
