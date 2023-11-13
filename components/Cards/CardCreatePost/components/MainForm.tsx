import { POST_MUTATION_MODE } from '@/constants/enums'
import { Stack } from '@/mui'
import { urlValidation } from '@/src/formValidations'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Control, FieldValues, Path, UseFormReset, UseFormSetValue } from 'react-hook-form'
import { RdImageList, RdInput, RdTextEditor } from '../../..'
import BottomControl from './BottomControl'

type TMainFormProps<T extends FieldValues> = {
  control: Control<T>
  open: boolean
  isLinkPost: boolean
  imagesValue: FileList | undefined
  subId: number | undefined
  loading: boolean
  isDirty: boolean
  reset: UseFormReset<T>
  setFormValue: UseFormSetValue<T>
  setIsLinkPost: Dispatch<SetStateAction<boolean>>
}

function MainForm<T extends FieldValues>({
  setIsLinkPost,
  reset,
  setFormValue,
  open,
  isDirty,
  isLinkPost,
  control,
  imagesValue,
  subId,
  loading
}: TMainFormProps<T>) {
  const {
    query: { postid, mode }
  } = useRouter()
  const isEditing = mode === POST_MUTATION_MODE.Edit

  // Populate subId & post id (edit mode)
  useEffect(() => {
    postid && setFormValue('id' as Path<T>, postid as any)
    subId && setFormValue('subreddit_id' as Path<T>, subId as any)
  }, [setFormValue, postid, subId])

  return (
    <Stack spacing={1} display={open ? 'flex' : 'none'}>
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
        <RdTextEditor<T> registerOptions={{ required: 'Body is required' }} control={control} name={'body' as Path<T>} />
      )}

      {/* uploaded images preview */}
      {!isLinkPost && imagesValue && imagesValue.length > 0 && <RdImageList images={imagesValue} cols={5} />}

      {/* Subreddit select + Back btn + Post btn + Reset btn (trash can) */}
      <BottomControl
        subId={subId}
        isEditing={isEditing}
        control={control}
        loading={loading}
        isDirty={isDirty}
        setIsLinkPost={setIsLinkPost}
        reset={reset}
      />
    </Stack>
    // {/* <ErrorMessage errors={errors} render={({ message }) => <p>{message}</p>} /> */}
  )
}

export default MainForm
