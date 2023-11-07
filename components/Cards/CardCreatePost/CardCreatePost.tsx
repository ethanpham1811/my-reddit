import { useForm } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardCreatePostForm, TEditModePayload } from '@/constants/types'
import { usePostCreateAndEdit } from '@/hooks'
import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from '@/mui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RdCard } from '../..'
import AvatarColumn from './components/AvatarColumn'
import FormColumn from './components/FormColumn'
import Tools from './components/Tools'

type TCardCreatePostProps = {
  subId?: number | undefined
  editModePayload?: TEditModePayload
}

/**
 * Only available if:
 * - user logged in and
 * - joined at least one subreddit
 *
 * Normal post:
 * - title
 * - body
 * - images
 *
 * Link post:
 * - title
 * - link
 * - linkDescription
 *
 * Disable user interaction on:
 * - deleting post
 * - newly added optimistic post
 *
 */
function CardCreatePost({ subId, editModePayload }: TCardCreatePostProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { breakpoints } = useTheme()
  const { createPost, updatePost, loading } = usePostCreateAndEdit()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const [isLinkPost, setIsLinkPost] = useState(false)
  const userName: string | undefined | null = session?.userDetail?.username
  const {
    query: { mode }
  } = useRouter()
  const isEditing: boolean = mode === POST_MUTATION_MODE.Edit
  const isDisabled: boolean = !me || !me.member_of_ids || me?.member_of_ids?.length === 0

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

  /* set link post mode if eligible */
  useEffect(() => {
    editModePayload?.link && setIsLinkPost(true)
  }, [setIsLinkPost, editModePayload])

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    // edit post
    if (isEditing) {
      updatePost(formData, isLinkPost)
    }
    //create post
    else {
      createPost(formData, createPostCb, isLinkPost)
    }
  })

  /* Cb to reset the form */
  function createPostCb() {
    setTimeout(() => {
      setIsLinkPost(false)
      reset()
    }, 100)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <RdCard sx={{ p: { xs: 2, sm: 1.5 }, opacity: isDisabled ? 0.5 : 1 }}>
        <form onSubmit={onSubmit}>
          <Stack direction={formOpened ? { xs: 'column', sm: 'row' } : 'row'} spacing={{ xs: 1, sm: '0' }}>
            {/* left column */}
            {(!isMobile || !formOpened) && <AvatarColumn userName={userName} />}
            {/* main section */}
            <FormColumn<TCardCreatePostForm>
              editModePayload={editModePayload}
              control={control}
              formOpened={formOpened}
              getFormValues={getValues}
              setFormValue={setValue}
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
                imagesValue={imagesValue}
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

      {/* Message to user if user has not joined any subreddit  */}
      {isDisabled && (
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          variant="body2"
        >
          Please join at least one subreddit to create a post.
        </Typography>
      )}
    </Box>
  )
}

export default CardCreatePost
