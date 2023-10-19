import { CardCommentBox, RdCard, RdImageCarousel } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TCardPostProps, TUserDetail } from '@/constants/types'
import { parseHtml } from '@/services'
import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ActionMenu from './components/ActionMenu'
import PostHeader from './components/PostHeader'
import VoteColumn from './components/VoteColumn'

function CardPost({ id: postId, images, inGroup, body, title, username, createdAt, upvote, subName, comment: commentList, link }: TCardPostProps) {
  const { session } = useAppSession()
  const me: TUserDetail | undefined | null = session?.userDetail
  const {
    push: navigate,
    query: { postid }
  } = useRouter()

  // only show subreddit that user is member of
  const isMyPost = me?.username === username

  /* navigate to post detail page */
  const goToPost = () => !postid && navigate(`/r/${subName}/post/${postId}`)

  return (
    <Stack position="relative" spacing={2}>
      <RdCard onClick={goToPost} sx={{ '&:hover': !postid ? { cursor: 'pointer', border: '1px solid', borderColor: 'orange.main' } : {} }}>
        <Stack direction="row">
          {/* side column */}
          <VoteColumn upvote={upvote} me={me} postId={postId} />

          {/* main section */}
          <Box flex={1} ml={1} pl={1}>
            {/* post Header */}
            <PostHeader inGroup={inGroup} subName={subName} username={username} createdAt={createdAt} />
            {/* post content */}
            <Box p={1}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body1" fontWeight={400} fontSize="1rem">
                {parseHtml(body)}
              </Typography>
              {link && <Box>{link}</Box>}
              {/* {link && <LinkPreview url={link} width="400px" />} */}
            </Box>
            {/* image carousel */}
            {images && <RdImageCarousel width="100%" height="300px" imgList={images} />}
          </Box>
        </Stack>

        {/* 3 dot menu */}
      </RdCard>
      {isMyPost && <ActionMenu postId={postId} />}
      {postid != null && <CardCommentBox subName={subName} commentList={commentList} post_id={postId} user_id={123} username={me?.email as string} />}
    </Stack>
  )
}

export default CardPost
