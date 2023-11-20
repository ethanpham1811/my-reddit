import { RdDialog } from '@/src/components'
import { CommentOutlinedIcon } from '@/src/constants/icons'
import { usePostDelete } from '@/src/hooks'
import { Box, Button, Stack, Typography } from '@/src/mui'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CardConfirm from '../../CardConfirm/CardConfirm'

type TBottomActionMenuProps = {
  postId: string
  isMyPost: boolean
  subName: string
  totalComments: number | undefined
  setIsDeleting: Dispatch<SetStateAction<boolean>>
}
function BottomActionMenu({ setIsDeleting, postId, isMyPost, subName, totalComments }: TBottomActionMenuProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { push: navigate } = useRouter()
  const { deletePostData, loading } = usePostDelete()
  const {
    query: { postid }
  } = useRouter()

  /* disable user interaction while deleting */
  useEffect(() => {
    setIsDeleting(loading)
  }, [loading, setIsDeleting])

  async function handleDeletePost() {
    setIsOpenDialog(true)
  }

  // navigate to edit post page
  function handleEditPost() {
    navigate(`/r/${subName}/post/${postId}?editing=true`, undefined, { scroll: false })
  }

  return (
    <>
      <Stack direction="row">
        <Box width={40} m={-1} mt={0} bgcolor="inputBgOutfocused.main"></Box>
        <Box display="flex" gap={1} flex={1} ml={1} px={1} pt={1} justifyContent="space-between">
          {/* vote-comment counter */}
          <Stack direction="row" alignItems="center" justifySelf="flex-start">
            <Typography fontWeight={400} fontSize="0.8rem" sx={{ color: 'hintText.main', ml: 1 }}>
              <CommentOutlinedIcon sx={{ fontSize: '1rem', position: 'relative', top: '2px', mr: 0.5 }} />
              {totalComments || 0}
            </Typography>
          </Stack>

          {/* only available if the post is mine */}
          {isMyPost && !!postid && (
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={handleEditPost} sx={{ minWidth: '40px', px: 0, color: 'blue.main', cursor: 'pointer' }}>
                <Typography fontSize="0.8rem" variant="body1" textTransform="none">
                  Edit
                </Typography>
              </Button>
              <Button onClick={handleDeletePost} sx={{ minWidth: '40px', px: 0, color: 'blue.main', cursor: 'pointer' }}>
                <Typography fontSize="0.8rem" variant="body1" textTransform="none">
                  Delete
                </Typography>
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>

      {/* Deleting post dialog */}
      <RdDialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <CardConfirm
          solo
          filled
          invertColor={false}
          text="Deleting post?"
          btnText="Proceed"
          onConfirm={() => deletePostData(postId)}
          setOpen={setIsOpenDialog}
        />
      </RdDialog>
    </>
  )
}

export default BottomActionMenu
