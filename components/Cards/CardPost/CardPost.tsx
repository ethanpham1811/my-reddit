import { CardCommentBox, CardCreatePost as CardEditPost, RdCard } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardPostProps, TUserDetail } from '@/constants/types'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import ActionMenu from './components/ActionMenu'
import BottomActionMenu from './components/BottomActionMenu'
import PostColumn from './components/PostColumn'
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
  setZoomedImg
}: TCardPostProps) {
  const { session } = useAppSession()
  const me: TUserDetail | undefined | null = session?.userDetail
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
            <VoteColumn vote={vote} me={me} postId={postId} isMyPost={isMyPost} loadedInPostPage={!!postid} />

            {/* main section */}
            <PostColumn
              subName={subName}
              username={username}
              createdAt={createdAt}
              title={title}
              body={body}
              link={link}
              images={images}
              linkDescription={linkDescription}
              setZoomedImg={setZoomedImg}
            />
          </Stack>
          {isMyPost && !!postid && <BottomActionMenu subName={subName} postId={postId.toString()} />}
        </RdCard>
      )}

      {/* 3 dot menu */}
      {isMyPost && !postid && <ActionMenu subName={subName} postId={postId.toString()} />}

      {/* comment box (post detail page) */}
      {postid != null && (
        <CardCommentBox subName={subName} commentList={commentList} post_id={postId} user_id={me?.id} username={me?.username as string} />
      )}
    </Stack>
  )
}

export default CardPost
