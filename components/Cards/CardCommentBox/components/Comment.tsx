import { useAppSession } from '@/components/Layouts/MainLayout'
import { OPTIMISTIC_TEMP_ID } from '@/constants/enums'
import { Box, Stack, Typography } from '@/mui'
import { customFormatDistance } from '@/src/utils'
import Link from 'next/link'
import { useState } from 'react'
import ActionMenu from './ActionMenu'
import EditForm from './EditForm'

type TCommentProps = {
  username: string
  commentId: string
  created_at: string
  text: string
}

function Comment({ commentId, username, created_at, text: initComment }: TCommentProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [updatedText, setUpdatedText] = useState<string | null>(null)

  // check if this comment belong to the user
  const isMyComment: boolean = me?.username === username

  // optimistic comment || to be deleted comment => block user interaction
  const blockInteraction = commentId === OPTIMISTIC_TEMP_ID.toString() || isDeleting

  return (
    <Stack sx={{ mx: 1, pl: 1, position: 'relative', opacity: blockInteraction ? 0.3 : 1 }} flex={1}>
      <Stack direction="row">
        <Typography sx={{ color: 'black.main' }}>
          <Link href={`/u/${username}`} style={{ color: 'inherit' }}>
            {username}
          </Link>
        </Typography>
        <Box mx={0.5} color="hintText.main" fontSize="0.8rem">
          •
        </Box>
        <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'hintText.main', p: { my: '2px', bgcolor: 'red' } }}>
          {customFormatDistance(new Date(created_at))}
        </Typography>
      </Stack>

      {/*
       * comment & edit form
       * - Edit form is absolute on top of the real comment
       * - the real comment size sync with the edit form
       * - so these two has to exist at the same time
       */}
      <Stack position="relative" flex={1}>
        {isEditing && (
          <EditForm
            setUpdatedText={setUpdatedText}
            commentId={commentId}
            initComment={initComment}
            closeEditForm={setIsEditing}
            created_at={created_at}
          />
        )}
        <Typography
          sx={{ visibility: isEditing ? 'hidden' : 'show' }}
          className="parsed-html"
          fontSize="14px"
          whiteSpace="pre-line"
          variant="subtitle1"
          minHeight="2rem"
          lineHeight={1.4}
          py={0.5}
          pb={isEditing ? 5 : 0.5}
        >
          {updatedText != null ? updatedText : initComment}
        </Typography>
      </Stack>

      {/* 3 dots menu */}
      {isMyComment && !blockInteraction && (
        <ActionMenu setIsDeleting={setIsDeleting} onClickEdit={() => setIsEditing(true)} commentId={commentId.toString()} />
      )}
    </Stack>
  )
}

export default Comment
