import { useAppSession } from '@/src/Layouts/MainLayout'
import { useDarkMode } from '@/src/Layouts/MuiProvider'
import { CardCommentBox, CardCreatePost as CardEditPost, RdCard } from '@/src/components'
import { DARK_MODE, OPTIMISTIC_TEMP_ID } from '@/src/constants/enums'
import { TCardPostProps, TUserDetail } from '@/src/constants/types'
import { Stack } from '@/src/mui'
import { useRouter } from 'next/router'
import { KeyboardEvent, MouseEvent, useState } from 'react'
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
    linkDescription,
    totalComments
  },
  setZoomedImg
}: TCardPostProps) {
  const { mode } = useDarkMode()
  const { session } = useAppSession()
  const me: TUserDetail | undefined | null = session?.userDetail
  const {
    push: navigate,
    query: { postid, editing }
  } = useRouter()
  const isEditing = editing === 'true'
  const [isDeleting, setIsDeleting] = useState(false)
  const onPostPage: boolean = postid != null
  const isMyPost = me?.username === username

  // optimistic post || to be deleted post => block user interaction
  const blockInteraction = postId === OPTIMISTIC_TEMP_ID || isDeleting

  // opacity amount (optimistic post) differ based on color mode
  const opacityAmount: number = mode === DARK_MODE.dark ? 0.2 : 0.5

  /* navigate to post detail page */
  function goToPost(e: MouseEvent | KeyboardEvent) {
    if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') return
    !onPostPage && !blockInteraction && navigate(`/r/${subName}/post/${postId}`)
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
        <RdCard
          tabIndex={onPostPage ? -1 : 0}
          onKeyDown={goToPost}
          onClick={goToPost}
          sx={{
            pointerEvents: blockInteraction ? 'none' : 'auto',
            opacity: blockInteraction ? opacityAmount : 1,
            '&:hover': !onPostPage ? { cursor: 'pointer', border: '1px solid', borderColor: 'orange.main' } : {}
          }}
        >
          <Stack direction="row">
            {/* side column */}
            <VoteColumn vote={vote} me={me} postId={postId} isMyPost={isMyPost} onPostPage={onPostPage} />

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

          {/* comment count + edit/delete buttons */}
          <BottomActionMenu
            setIsDeleting={setIsDeleting}
            isMyPost={isMyPost}
            totalComments={totalComments}
            subName={subName}
            postId={postId.toString()}
          />
        </RdCard>
      )}

      {/* 3 dot menu */}
      {isMyPost && !blockInteraction && !onPostPage && <ActionMenu setIsDeleting={setIsDeleting} subName={subName} postId={postId.toString()} />}

      {/* comment box (post detail page) */}
      {onPostPage && <CardCommentBox commentList={commentList} post_id={postId} user_id={me?.id} username={me?.username as string} />}
    </Stack>
  )
}

export default CardPost
