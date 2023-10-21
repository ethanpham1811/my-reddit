import { CardCommentBox, CardCreatePost as CardEditPost, RdCard } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardPostProps, TUserDetail } from '@/constants/types'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ActionMenu from './components/ActionMenu'
import BottomActionMenu from './components/BottomActionMenu'
import PostColumn from './components/PostColumn'
import PreviewImgDialog from './components/PreviewImgDialog'
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
    subreddit: { name: subName, id: subId },
    comment: commentList,
    link,
    linkDescription
  },
  loadedInSubPage,
  loadedInPostPage
}: TCardPostProps) {
  const { session } = useAppSession()
  const me: TUserDetail | undefined | null = session?.userDetail
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false)
  const [zoomedImg, setZoomedImg] = useState<string | null>(null)
  const {
    push: navigate,
    query: { postid, mode }
  } = useRouter()
  const isEditing = mode === POST_MUTATION_MODE.Edit

  // only show subreddit that user is member of
  const isMyPost = me?.username === username

  /* navigate to post detail page */
  function goToPost() {
    !postid && navigate(`/r/${subName}/post/${postId}`)
  }

  return (
    <Stack position="relative" spacing={2}>
      {isEditing ? (
        <CardEditPost
          subId={subId}
          editModePayload={{
            title,
            body,
            images,
            link,
            linkDescription
          }}
        />
      ) : (
        <RdCard onClick={goToPost} sx={{ '&:hover': !postid ? { cursor: 'pointer', border: '1px solid', borderColor: 'orange.main' } : {} }}>
          <Stack direction="row">
            {/* side column */}
            <VoteColumn vote={vote} me={me} postId={postId} />

            {/* main section */}
            <PostColumn
              loadedInPostPage={loadedInPostPage}
              loadedInSubPage={loadedInSubPage}
              subName={subName}
              username={username}
              createdAt={createdAt}
              title={title}
              body={body}
              link={link}
              linkDescription={linkDescription}
              setZoomDialogOpen={setZoomDialogOpen}
              setZoomedImg={setZoomedImg}
              images={images}
            />
          </Stack>
          {isMyPost && loadedInPostPage && <BottomActionMenu subName={subName} postId={postId.toString()} />}
        </RdCard>
      )}

      {/* 3 dot menu */}
      {isMyPost && !loadedInPostPage && <ActionMenu subName={subName} postId={postId.toString()} />}

      {/* comment box (post detail page) */}
      {postid != null && (
        <CardCommentBox subName={subName} commentList={commentList} post_id={postId} user_id={me?.id} username={me?.username as string} />
      )}

      {/* dialog show zoomed image */}
      <PreviewImgDialog zoomDialogOpen={zoomDialogOpen} setZoomDialogOpen={setZoomDialogOpen} setZoomedImg={setZoomedImg} zoomedImg={zoomedImg} />
    </Stack>
  )
}

export default CardPost
