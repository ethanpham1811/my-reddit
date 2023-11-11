import { RdNakedInput } from '@/components'
import { TPostCommentForm } from '@/constants/types'
import { useCommentUpdate } from '@/hooks'
import { Button, Stack } from '@/mui'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type TEditFormProps = {
  closeEditForm: Dispatch<SetStateAction<boolean>>
  setUpdatedText: Dispatch<SetStateAction<string | null>>
  created_at: string
  initComment: string
  commentId: string
}

/**
 * Render on user clicking on comment edit
 */
function EditForm({ closeEditForm, setUpdatedText, created_at, initComment, commentId }: TEditFormProps) {
  const { editComment } = useCommentUpdate()
  const { control, handleSubmit, setValue, watch } = useForm<TPostCommentForm>({ mode: 'all' })
  const commentValue = watch('comment')

  /* map comment text to form */
  useEffect(() => {
    setValue('comment', initComment)
  }, [initComment, setValue])

  /* submit update comment */
  const onUpdateComment = handleSubmit(async ({ comment }) => {
    if (!comment || commentId == null) return
    setValue('comment', '')
    setUpdatedText(null)
    closeEditForm(false)

    const res = await editComment(commentId as string, comment, created_at)

    if (res?.error) return toast.error(res.error[0].message)
  })

  return (
    <Stack position="absolute" top={0} left={0} width="100%">
      <RdNakedInput<TPostCommentForm> multiline fullWidth control={control} name={'comment'} onChangeCb={setUpdatedText} />

      {/* cancel / update buttons */}
      <Stack direction="row" justifyContent="flex-end" mt={0.5}>
        <Button
          sx={{ textTransform: 'none', py: 0.2 }}
          color="orange"
          onClick={() => {
            setUpdatedText(null)
            closeEditForm(false)
          }}
        >
          Cancel
        </Button>
        <Button disabled={!commentValue} sx={{ textTransform: 'none', py: 0.2 }} color="orange" onClick={onUpdateComment}>
          Update
        </Button>
      </Stack>
    </Stack>
  )
}

export default EditForm
