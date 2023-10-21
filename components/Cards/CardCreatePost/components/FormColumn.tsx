import RdInput from '@/components/utilities/RdInput/RdInput'
import { postTitleValidation } from '@/services'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { Stack } from '@mui/material'
import { useEffect, useRef } from 'react'
import MainForm from '../components/MainForm'

import { TFormColumnProps } from '@/constants/types'
import useConvertUrlToImages from '@/hooks/useConvertUrlToImages'
import { useRouter } from 'next/router'
import { FieldValues, Path } from 'react-hook-form'

function FormColumn<T extends FieldValues>({
  control,
  titleValue,
  getValues,
  setValue,
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

  /* mapping post data and populate fields value in edit mode */
  useEffect(() => {
    if (editModePayload) {
      Object.keys(editModePayload).forEach((key) => {
        setValue(key as Path<T>, key !== 'images' ? (editModePayload as { [key: string]: any })[key] : uploadedImgFiles)
      })
    }
  }, [setValue, editModePayload, uploadedImgFiles])

  /* Event subscriber for opening the form from somewhere else */
  useEffect(() => {
    // set subId if available
    postid && setValue('id' as Path<T>, postid as any)
    subId && setValue('subreddit_id' as Path<T>, subId as any)

    let sto: NodeJS.Timeout | null = null

    eventEmitter.subscribe(Events.OPEN_CREATE_POST_FORM, (state) => {
      ref?.current?.focus()
      !getValues('title' as Path<T>) && setValue('title' as Path<T>, 'Your post title' as any)

      sto = setTimeout(() => {
        ref?.current?.select()
      }, 100)
    })
    return () => {
      sto && clearTimeout(sto)
      eventEmitter.unsubscribe(Events.OPEN_CREATE_POST_FORM)
    }
  }, [setValue, getValues, postid, subId])

  return (
    <Stack spacing={1.5} flex={1}>
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
      {(!!titleValue || isDirty) && (
        <MainForm<T>
          reset={reset}
          isDirty={isDirty}
          loading={loading}
          isLinkPost={isLinkPost}
          control={control}
          imagesValue={imagesValue}
          subId={subId}
          setIsLinkPost={setIsLinkPost}
        />
      )}
    </Stack>
  )
}

export default FormColumn
