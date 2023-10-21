import { RdDialog, RdIconSelect } from '@/components'
import { MoreHorizIcon } from '@/constants/icons'
import { TSelectOption } from '@/constants/types'
import usePostDeleteUpdate from '@/hooks/usePostDeleteUpdate'
import { useState } from 'react'
import CardConfirm from '../../CardConfirm/CardConfirm'

function ActionMenu({ postId }: { postId: string }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { deletePostData, editPostData, loading } = usePostDeleteUpdate()

  /* action options */
  const postActionOptions: TSelectOption[] = [
    {
      title: 'Edit',
      cb: handleEditPost
    },
    {
      title: 'Delete',
      cb: handleDeletePost
    }
  ]

  function handleEditPost() {
    // const payload = {body: , images: , title: , link: }
    // editPostData(payload)
  }

  async function handleDeletePost() {
    setIsOpenDialog(true)
  }

  return (
    <>
      <RdIconSelect
        disabled={loading}
        position={{ left: '-70px' }}
        disableRipple
        size="small"
        options={postActionOptions}
        icon={MoreHorizIcon}
        sx={{ position: 'absolute', top: 0, right: '0.5rem', color: 'hintText.main', '&:hover': { color: 'inherit' } }}
      />
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

export default ActionMenu
