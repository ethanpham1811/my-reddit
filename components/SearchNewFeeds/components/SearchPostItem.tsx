import { TQueriedPost } from '@/constants/types'
import { blurBottomStyle, postHoverStyle } from '@/mui/styles'

import { MAX_NEW_FEEDS_POST_HEIGHT } from '@/constants/enums'
import { Divider, Stack, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useRef } from 'react'
import SearchPostItemBody from './SearchPostItemBody'
import SearchPostItemFooter from './SearchPostItemFooter'
import SearchPostItemHeader from './SearchPostItemHeader'

function SearchPostItem({ item }: { item: TQueriedPost }) {
  const { push: navigate } = useRouter()
  const { palette: {mode} } = useTheme()
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

  /* if a post's height > 200px => blur out the overflow bottom part */
  const ref = useRef<HTMLDivElement>(null)
  const bottomStyle = ref?.current?.offsetHeight && ref?.current?.offsetHeight >= MAX_NEW_FEEDS_POST_HEIGHT ? blurBottomStyle('80px', mode) : {}

  /* navigate to post detail page */
  const goToPost = () => navigate(`/r/${subName}/post/${id}`)

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
        {/* header & body */}
        <SearchPostItemHeader subName={subName} username={username} created_at={created_at} />
        <SearchPostItemBody title={title} body={body} images={images} id={id} bottomStyle={bottomStyle} />

        {/* upvote & comment count */}
        <SearchPostItemFooter vote={vote} comment={comment} />
      </Stack>
      <Divider sx={{ borderColor: 'inputBorder.main' }} />
    </Fragment>
  )
}

export default SearchPostItem
