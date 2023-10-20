import { CardCommentBox, RdCard, RdDialog, RdImageCarousel } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TCardPostProps, TUserDetail } from '@/constants/types'
import { parseHtml } from '@/services'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ActionMenu from './components/ActionMenu'
import PostHeader from './components/PostHeader'
import VoteColumn from './components/VoteColumn'

function CardPost({
  post: {
    id: postId,
    images,
    body,
    title,
    user: { username },
    created_at: createdAt,
    vote,
    subreddit: { name: subName },
    comment: commentList,
    link
  },
  inGroup
}: TCardPostProps) {
  const { session } = useAppSession()
  const me: TUserDetail | undefined | null = session?.userDetail
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false)
  const [zoomedImg, setZoomedImg] = useState<string | null>(null)
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
          <VoteColumn vote={vote} me={me} postId={postId} />

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
            {images && (
              <RdImageCarousel setZoomDialogOpen={setZoomDialogOpen} setZoomedImg={setZoomedImg} width="100%" height="300px" imgList={images} />
            )}
          </Box>
        </Stack>

        {/* 3 dot menu */}
      </RdCard>
      {isMyPost && <ActionMenu postId={postId} />}
      {postid != null && (
        <CardCommentBox subName={subName} commentList={commentList} post_id={postId} user_id={me?.id} username={me?.username as string} />
      )}
      <RdDialog
        open={zoomDialogOpen}
        maxWidth="xl"
        transparent
        onClose={() => {
          setZoomDialogOpen(false)
          setZoomedImg(null)
        }}
      >
        {zoomedImg && (
          <Image
            src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL + zoomedImg}
            alt={'zoomed image'}
            sizes="(min-width: 1024px) 900px, 1800px"
            style={{
              objectFit: 'contain',
              width: '100%'
            }}
            width={1800}
            height={500}
          />
        )}
      </RdDialog>
    </Stack>
  )
}

export default CardPost
