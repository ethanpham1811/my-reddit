import { POST_MUTATION_MODE } from '@/constants/enums'
import { DeleteOutlineOutlinedIcon } from '@/constants/icons'
import { urlValidation } from '@/services'
import { CircularProgress, IconButton, Stack, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { Control, FieldValues, Path, UseFormReset } from 'react-hook-form'
import { RdButton, RdImageList, RdInput, RdSubredditSelect, RdTextEditor } from '../../..'

type TMainFormProps<T extends FieldValues> = {
  control: Control<T>
  isLinkPost: boolean
  imagesValue: FileList | undefined
  subId: number | undefined
  loading: boolean
  isDirty: boolean
  reset: UseFormReset<T>
  setIsLinkPost: Dispatch<SetStateAction<boolean>>
}

function MainForm<T extends FieldValues>({ setIsLinkPost, reset, isDirty, isLinkPost, control, imagesValue, subId, loading }: TMainFormProps<T>) {
  const {
    push: navigate,
    query: { subreddit: subName, postid, mode }
  } = useRouter()
  const [backBtnHover, isBackBtnHover] = useState(false)
  const isEditing = mode === POST_MUTATION_MODE.Edit

  return (
    <Stack spacing={1}>
      {/* link or textEditor */}
      {isLinkPost ? (
        <Stack spacing={1.5}>
          <RdInput<T>
            registerOptions={{ validate: (val) => urlValidation(val) }}
            bgcolor="white"
            flex={1}
            control={control}
            name={'link' as Path<T>}
            placeholder="Link URL"
          />
          <RdInput<T>
            registerOptions={{ required: 'Description is required' }}
            bgcolor="white"
            flex={1}
            control={control}
            name={'linkDescription' as Path<T>}
            placeholder="Short description"
          />
        </Stack>
      ) : (
        <RdTextEditor<T>
          clearBodyOnFocus={!isEditing}
          registerOptions={{ required: 'Body is required' }}
          control={control}
          name={'body' as Path<T>}
          placeholder="Start your essay.."
        />
      )}

      {/* uploaded images preview */}
      {!isLinkPost && imagesValue && imagesValue.length > 0 && <RdImageList images={imagesValue} cols={5} />}

      {/* Subreddit select & Submit button */}
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" width="100%">
        {subId == null && <RdSubredditSelect registerOptions={{ required: true }} control={control} name={'subreddit_id' as Path<T>} width="180px" />}
        {isEditing && (
          <RdButton
            onMouseEnter={() => isBackBtnHover(true)}
            onMouseLeave={() => isBackBtnHover(false)}
            onClick={() => navigate(`/r/${subName}/post/${postid}`, undefined, { scroll: false })}
            filled={backBtnHover}
            text={'Back to view'}
            color="blue"
            width="30%"
          />
        )}
        <RdButton
          endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
          disabled={loading || !isDirty}
          type="submit"
          text={isEditing ? 'Update' : 'Post'}
          filled={!loading && !backBtnHover && isDirty}
          color="blue"
          width="30%"
        />

        <Tooltip title="Clear and close">
          <IconButton
            disabled={isEditing}
            sx={{ bgcolor: 'actionIcon.main', p: 0.5, color: 'white.main', '&:hover': { bgcolor: 'actionIcon.main', opacity: 0.8 } }}
            onClick={() => {
              setIsLinkPost(false)
              reset()
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ display: 'block', fontSize: '1.5rem' }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
    // {/* <ErrorMessage errors={errors} render={({ message }) => <p>{message}</p>} /> */}
  )
}

export default MainForm
