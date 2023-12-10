import { useDarkMode } from '@/src/Layouts/MuiProvider'
import { MAX_NEW_FEEDS_POST_HEIGHT } from '@/src/constants/enums'
import { TQueriedPost } from '@/src/constants/types'
import { Divider, Stack } from '@/src/mui'
import { blurBottomStyle, postHoverStyle } from '@/src/mui/styles'
import { useRouter } from 'next/router'
import { Fragment, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import SearchPostItemBody from './SearchPostItemBody'
import SearchPostItemFooter from './SearchPostItemFooter'
import SearchPostItemHeader from './SearchPostItemHeader'

function SearchPostItem({ item }: { item: TQueriedPost }) {
  const { push: navigate } = useRouter()
  const { mode } = useDarkMode()
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
  const [blurredBottomStyle, setBlurredBottomStyle] = useState({})

  /* if a post's height > 200px => blur out the overflow bottom part */
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref?.current) return
    const isHeightExceeded = ref?.current?.offsetHeight && ref?.current?.offsetHeight >= MAX_NEW_FEEDS_POST_HEIGHT
    setBlurredBottomStyle(isHeightExceeded ? blurBottomStyle('80px', mode) : {})
  }, [ref, mode])

  /* navigate to post detail page */
  function goToPost(e: MouseEvent | KeyboardEvent) {
    if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') return
    navigate(`/r/${subName}/post/${id}`)
  }

  return (
    <Fragment key={`post_${id}_search_result`}>
      <Stack
        ref={ref}
        spacing={1}
        py={2}
        px={3}
        tabIndex={0}
        alignContent="flex-start"
        onKeyDown={goToPost}
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
        <SearchPostItemBody title={title} body={body} images={images} id={id} bottomStyle={blurredBottomStyle} />

        {/* upvote & comment count */}
        <SearchPostItemFooter vote={vote} comment={comment} />
      </Stack>
      <Divider sx={{ borderColor: 'primary.light' }} />
    </Fragment>
  )
}

export default SearchPostItem
