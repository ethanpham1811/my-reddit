import { useForm } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardCreatePostForm, TEditModePayload } from '@/constants/types'
import usePostCreateAndEdit from '@/hooks/usePostCreateAndEdit'
import { theme } from '@/mui/theme'
import { Box, Divider, Stack, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RdCard } from '../..'
import AvatarColumn from './components/AvatarColumn'
import FormColumn from './components/FormColumn'
import Tools from './components/Tools'

function CardCreatePost({ subId, editModePayload }: { subId?: number | undefined; editModePayload?: TEditModePayload }) {
  const { session } = useAppSession()
  const { createPost, updatePost, loading } = usePostCreateAndEdit()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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

  const formOpened = !!titleValue || isDirty

  useEffect(() => {
    editModePayload?.link && setIsLinkPost(true)
  }, [setIsLinkPost, editModePayload])

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    // edit post
    if (isEditing) {
      await updatePost(formData, mutationCb, isLinkPost)
      navigate(`/r/${subName}/post/${postid}`)
    }
    //create post
    else {
      createPost(formData, mutationCb, isLinkPost)
    }
  })

  function mutationCb(error?: boolean) {
    if (error) return
    setTimeout(() => {
      reset()
    }, 100)
  }

  return (
    <RdCard sx={{ p: { xs: 2, sm: 1.5 } }}>
      <form onSubmit={onSubmit}>
        <Stack direction={formOpened ? { xs: 'column', sm: 'row' } : 'row'} spacing={{ xs: 1, sm: '0' }}>
          {/* left column */}
          {(!isMobile || !formOpened) && <AvatarColumn userName={userName} />}

          {/* main section */}
          <FormColumn<TCardCreatePostForm>
            editModePayload={editModePayload}
            control={control}
            formOpened={formOpened}
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
          <Divider />
          <Box
            width={{ xs: 'auto', sm: 40 }}
            display="flex"
            flex={formOpened ? { xs: 1, sm: 'none' } : 0}
            mx={{ xs: 'auto !important', sm: '0 !important' }}
          >
            <Tools<TCardCreatePostForm>
              isMobile={isMobile}
              imagesValue={imagesValue}
              userName={userName}
              isEditing={isEditing}
              control={control}
              formOpened={formOpened}
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
