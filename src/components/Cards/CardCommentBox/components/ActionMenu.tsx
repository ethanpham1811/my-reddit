import { RdDialog, RdIconSelect } from '@/src/components'
import { MoreHorizIcon } from '@/src/constants/icons'
import { TSelectOption } from '@/src/constants/types'
import useCommentDelete from '@/src/hooks/useCommentDelete'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CardConfirm from '../../CardConfirm/CardConfirm'

type TActionMenuProps = {
  commentId: string
  setIsDeleting: Dispatch<SetStateAction<boolean>>
  onClickEdit: () => void
}

/**
 * 3 dots action menu on each comment
 * - Edit
 * - Delete
 */
function ActionMenu({ commentId, setIsDeleting, onClickEdit }: TActionMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { deleteComment, loading } = useCommentDelete()

  /* disable user interaction while deleting */
  useEffect(() => {
    setIsDeleting(loading)
  }, [loading, setIsDeleting])

  /* action options */
  const commentActionOptions: TSelectOption[] = [
    {
      title: 'Edit',
      cb: onClickEdit
    },
    {
      title: 'Delete',
      cb: handleDeleteComment
    }
  ]

  async function handleDeleteComment() {
    setIsDialogOpen(true)
  }

  return (
    <>
      <RdIconSelect
        disabled={loading}
        position={{ left: '-40px' }}
        disableRipple
        size="small"
        options={commentActionOptions}
        icon={MoreHorizIcon}
        sx={{ position: 'absolute', top: '-15px', right: '10px', color: 'gray.dark', '&:hover': { color: 'inherit' } }}
      />

      {/* delete comment confirm dialog */}
      <RdDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <CardConfirm
          solo
          filled
          invertColor={false}
          text="Deleting comment?"
          btnText="Proceed"
          onConfirm={() => deleteComment(commentId)}
          setOpen={setIsDialogOpen}
        />
      </RdDialog>
    </>
  )
}

export default ActionMenu
