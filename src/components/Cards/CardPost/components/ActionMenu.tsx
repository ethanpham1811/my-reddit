import { RdDialog, RdIconSelect } from '@/src/components'
import { MoreHorizIcon } from '@/src/constants/icons'
import { TSelectOption } from '@/src/constants/types'
import { usePostDelete } from '@/src/hooks'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CardConfirm from '../../CardConfirm/CardConfirm'

type TActionMenuProps = {
  postId: string
  subName: string
  setIsDeleting: Dispatch<SetStateAction<boolean>>
}

function ActionMenu({ postId, subName, setIsDeleting }: TActionMenuProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { deletePostData, loading } = usePostDelete()
  const { push: navigate } = useRouter()

  /* disable user interaction while deleting */
  useEffect(() => {
    setIsDeleting(loading)
  }, [loading, setIsDeleting])

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

  async function handleDeletePost() {
    setIsOpenDialog(true)
  }

  // navigate to edit post page
  function handleEditPost() {
    navigate(`/r/${subName}/post/${postId}?editing=true`, undefined, { scroll: false })
  }

  return (
    <>
      <RdIconSelect
        disabled={loading}
        position={{ left: '-40px' }}
        disableRipple
        size="small"
        options={postActionOptions}
        icon={MoreHorizIcon}
        sx={{ position: 'absolute', top: 0, right: '0.5rem', color: 'gray.dark', '&:hover': { color: 'inherit' } }}
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
