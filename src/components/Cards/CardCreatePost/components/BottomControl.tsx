import { CloseIcon } from '@/src/constants/icons'
import { CircularProgress, IconButton, Stack } from '@/src/mui'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { RdButton, RdSubredditSelect } from '../../..'

type TBottomControlProps<T extends FieldValues> = {
  subId: number | undefined
  isEditing: boolean
  control: Control<T>
  loading: boolean
  isDirty: boolean
  setIsLinkPost: Dispatch<SetStateAction<boolean>>
  resetForm: (isSwitchType?: boolean) => void
}

function BottomControl<T extends FieldValues>({ subId, isEditing, control, loading, isDirty, setIsLinkPost, resetForm }: TBottomControlProps<T>) {
  const [backBtnHover, setBackBtnHover] = useState(false)
  const {
    push: navigate,
    query: { subreddit: subName, postid }
  } = useRouter()
  const submitBtnText = isEditing ? 'Update' : 'Post'
  const loadingSubmitBtnText = isEditing ? 'Updating..' : 'Posting..'

  return (
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" width="100%">
      {/*  Subreddit select */}
      {subId == null && <RdSubredditSelect registerOptions={{ required: true }} control={control} name={'subreddit_id' as Path<T>} width="180px" />}

      {/* Back button */}
      {isEditing && (
        <RdButton
          onMouseEnter={() => setBackBtnHover(true)}
          onMouseLeave={() => setBackBtnHover(false)}
          onClick={() => navigate(`/r/${subName}/post/${postid}`, undefined, { scroll: false })}
          filled={backBtnHover}
          text={'Back to view'}
          color="blue"
          sx={{ width: { xs: '50%', sm: '30%' }, py: 1 }}
        />
      )}

      {/* Submit button */}
      <RdButton
        endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
        disabled={loading || !isDirty}
        type="submit"
        text={loading ? loadingSubmitBtnText : submitBtnText}
        filled={!loading && !backBtnHover && isDirty}
        color="blue"
        sx={{ width: { xs: '50%', sm: '30%' }, py: 0.75 }}
      />

      {/* Close button (trash can):
        - clear the form
        - close the form
        - switch to normal post
      */}
      {!isEditing && (
        <IconButton
          disabled={isEditing}
          sx={{ p: 0.5, color: 'actionIcon.main' }}
          onClick={() => {
            setIsLinkPost(false)
            resetForm()
          }}
        >
          <CloseIcon sx={{ display: 'block', fontSize: '1.5rem' }} />
        </IconButton>
      )}
    </Stack>
  )
}

export default BottomControl
