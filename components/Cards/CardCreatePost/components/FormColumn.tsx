import RdInput from '@/components/utilities/RdInput/RdInput'
import { Stack } from '@/mui'
import { Events, eventEmitter } from '@/src/eventEmitter'
import { postTitleValidation } from '@/src/formValidations'
import { useEffect, useRef } from 'react'
import MainForm from '../components/MainForm'

import { TEditModePayload, TFormColumnProps } from '@/constants/types'
import { useConvertUrlToImages } from '@/hooks'
import { useRouter } from 'next/router'
import { FieldValues, Path, PathValue } from 'react-hook-form'

function FormColumn<T extends FieldValues>({
  control,
  formOpened,
  getFormValues,
  setFormValue,
  loading,
  isLinkPost,
  subId,
  imagesValue,
  editModePayload,
  isDirty,
  reset,
  setIsLinkPost
}: TFormColumnProps<T>) {
  const ref = useRef<HTMLInputElement | null>(null)
  const [uploadedImgFiles] = useConvertUrlToImages(editModePayload?.images)
  const {
    query: { postid }
  } = useRouter()

  /* mapping post data and populate fields value in edit mode  */
  useEffect(() => {
    if (editModePayload) {
      Object.keys(editModePayload).forEach((key) => {
        const value = key !== 'images' ? editModePayload[key as keyof TEditModePayload] : uploadedImgFiles
        setFormValue(key as Path<T>, value as PathValue<T, Path<T>>)
      })
    }
  }, [setFormValue, editModePayload, uploadedImgFiles])

  /* Event subscriber for opening the form from somewhere else */
  useEffect(() => {
    let sto: NodeJS.Timeout | null = null

    eventEmitter.subscribe(Events.OPEN_CREATE_POST_FORM, (_) => {
      ref?.current?.focus()
      !getFormValues('title' as Path<T>) && setFormValue('title' as Path<T>, 'Your post title' as PathValue<T, Path<T>>)

      sto = setTimeout(() => {
        ref?.current?.select()
      }, 100)
    })
    return () => {
      sto && clearTimeout(sto)
      eventEmitter.unsubscribe(Events.OPEN_CREATE_POST_FORM)
    }
  }, [setFormValue, getFormValues, postid, subId])

  return (
    <Stack spacing={1.5} flex={1}>
      {/* Title input */}
      <RdInput<T>
        ref={ref}
        bgcolor="white"
        flex={1}
        control={control}
        name={'title' as Path<T>}
        indentedHelper
        placeholder="Create Post"
        registerOptions={{ validate: (val) => postTitleValidation(val) }}
      />

      {/* Rest of the form (only show on form focused) */}
      <MainForm<T>
        open={formOpened}
        reset={reset}
        setFormValue={setFormValue}
        isDirty={isDirty}
        loading={loading}
        isLinkPost={isLinkPost}
        control={control}
        imagesValue={imagesValue}
        subId={subId}
        setIsLinkPost={setIsLinkPost}
      />
    </Stack>
  )
}

export default FormColumn
