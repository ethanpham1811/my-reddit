import { useForm } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardCreatePostForm, TEditModePayload } from '@/constants/types'
import usePostCreateAndEdit from '@/hooks/usePostCreateAndEdit'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RdCard } from '../..'
import AvatarColumn from './components/AvatarColumn'
import FormColumn from './components/FormColumn'
import Tools from './components/Tools'

function CardCreatePost({ subId, editModePayload }: { subId?: number | undefined; editModePayload?: TEditModePayload }) {
  const { session } = useAppSession()
  const { mutatePost, loading } = usePostCreateAndEdit()
  const [isLinkPost, setIsLinkPost] = useState(false)
  const userName: string | undefined | null = session?.userDetail?.username
  const {
    push: navigate,
    query: { mode, subreddit: subName, postid }
  } = useRouter()
  const isEditing = mode === POST_MUTATION_MODE.Edit

  /* form controllers */
  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { isDirty }
  } = useForm<TCardCreatePostForm>()
  const titleValue = watch('title')
  const imagesValue = watch('images')

  useEffect(() => {
    editModePayload?.link && setIsLinkPost(true)
  }, [setIsLinkPost, editModePayload])

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    // edit post
    if (isEditing) {
      await mutatePost(formData, mutationCb, isLinkPost, POST_MUTATION_MODE.Edit)
      navigate(`/r/${subName}/post/${postid}`)
    }
    //create post
    else {
      mutatePost(formData, mutationCb, isLinkPost, POST_MUTATION_MODE.Create)
    }
  })

  function mutationCb(error?: boolean) {
    if (error) return
    setTimeout(() => {
      reset()
    }, 100)
  }

  return (
    <RdCard sx={{ p: 1.5 }}>
      <form onSubmit={onSubmit}>
        <Stack direction="row">
          {/* left column */}
          <AvatarColumn userName={userName} />

          {/* main section */}
          <FormColumn<TCardCreatePostForm>
            editModePayload={editModePayload}
            control={control}
            titleValue={titleValue}
            getValues={getValues}
            setValue={setValue}
            loading={loading}
            isLinkPost={isLinkPost}
            subId={subId}
            imagesValue={imagesValue}
            isDirty={isDirty}
            reset={reset}
            setIsLinkPost={setIsLinkPost}
          />

          {/* right column */}
          <Box width={40} display="flex">
            <Tools<TCardCreatePostForm>
              imagesValue={imagesValue}
              isEditing={isEditing}
              control={control}
              isFormClosed={!titleValue && !isDirty}
              setIsLinkPost={setIsLinkPost}
              isLinkPost={isLinkPost}
            />
          </Box>
        </Stack>
      </form>
    </RdCard>
  )
}

export default CardCreatePost
