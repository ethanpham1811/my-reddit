import { TQueriedPost } from '@/src/constants/types'
import { Divider, Stack } from '@/src/mui'
import { postHoverStyle } from '@/src/mui/styles'
import { useRouter } from 'next/router'
import { Fragment, KeyboardEvent, MouseEvent, useRef } from 'react'
import SearchPostItemBody from './SearchPostItemBody'
import SearchPostItemFooter from './SearchPostItemFooter'
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
  const ref = useRef<HTMLDivElement>(null)

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
        <SearchPostItemBody title={title} body={body} images={images} id={id} parentRef={ref} />

        {/* upvote & comment count */}
        <SearchPostItemFooter vote={vote} comment={comment} />
      </Stack>
      <Divider sx={{ borderColor: 'primary.dark' }} />
    </Fragment>
  )
}

export default SearchPostItem
