import { RdDialog } from '@/components'
import usePostDeleteUpdate from '@/hooks/usePostDeleteUpdate'
import { Box, Link, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import CardConfirm from '../../CardConfirm/CardConfirm'

function BottomActionMenu({ postId }: { postId: string }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { deletePostData, editPostData } = usePostDeleteUpdate()

  function handleEditPost() {
    // const payload = {body: , images: , title: , link: }
    // editPostData(payload)
  }

  async function handleDeletePost() {
    setIsOpenDialog(true)
  }

  return (
    <>
      <Stack direction="row">
        <Box width={40} m={-1} mt={0} bgcolor="inputBgOutfocused.main"></Box>
        <Box display="flex" gap={1} flex={1} ml={1} pl={1} pr={1} justifyContent="flex-end">
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
        </Box>
      </Stack>
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
