import { RdDialog } from '@/components'
import { CommentOutlinedIcon } from '@/constants/icons'
import { usePostDelete } from '@/hooks'
import { Box, Link, Stack, Typography } from '@/mui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CardConfirm from '../../CardConfirm/CardConfirm'

type TBottomActionMenuProps = {
  postId: string
  isMyPost: boolean
  subName: string
  totalComments: number | undefined
}
function BottomActionMenu({ postId, isMyPost, subName, totalComments }: TBottomActionMenuProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { push: navigate } = useRouter()
  const { deletePostData } = usePostDelete()
  const {
    query: { postid }
  } = useRouter()

  async function handleDeletePost() {
    setIsOpenDialog(true)
  }

  // navigate to edit post page
  function handleEditPost() {
    navigate(`/r/${subName}/post/${postId}?mode=edit`, undefined, { scroll: false })
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
              <Link onClick={handleEditPost} underline="hover" sx={{ color: 'blue.main', cursor: 'pointer' }}>
                <Typography fontSize="0.8rem" variant="body1">
                  Edit
                </Typography>
              </Link>
              <Link onClick={handleDeletePost} underline="hover" sx={{ color: 'blue.main', cursor: 'pointer' }}>
                <Typography fontSize="0.8rem" variant="body1">
                  Delete
                </Typography>
              </Link>
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
