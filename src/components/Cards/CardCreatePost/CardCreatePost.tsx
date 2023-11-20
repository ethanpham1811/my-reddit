import { useAppSession } from '@/src/Layouts/MainLayout'
import { TCardCreatePostForm, TEditModePayload } from '@/src/constants/types'
import { useEditPostDataMap, usePostCreateAndEdit, usePostCreateFormListener, usePostCreateFormMode } from '@/src/hooks'
import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from '@/src/mui'
import { postTitleValidation } from '@/src/services/formValidations'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { Path, useForm } from 'react-hook-form'
import { RdCard, RdInput } from '../..'
import AvatarColumn from './components/AvatarColumn'
import MainForm from './components/MainForm'
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
  const isDisabled: boolean = !me || !me.member_of_ids || me?.member_of_ids?.length === 0
  const userName: string | undefined | null = session?.userDetail?.username
  const ref = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const isEditing: boolean = router?.query?.editing === 'true'
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const { createPost, updatePost, loading, uploadImgError, setUploadImgError } = usePostCreateAndEdit()
  const [isLinkPost, setIsLinkPost] = usePostCreateFormMode(editModePayload)
  const {
    reset,
    handleSubmit,
    watch,
    setValue: setFormValue,
    getValues: getFormValues,
    control,
    formState: { isDirty }
  } = useForm<TCardCreatePostForm>()

  const titleValue = watch('title')
  const bodyValue = watch('body')
  const imagesValue = watch('images')
  const formOpened = !!titleValue || isDirty

  /*
   * set body to '' on title receiving value
   * this is the workaround for mceTiny editor
   * the editor won't receive undefined (set by reset()) -> inputted value always persists
   * -> need to manually set the value of editor to '' every time user open the form
   */
  useEffect(() => {
    titleValue && bodyValue == null && setFormValue('body', '')
  }, [titleValue, bodyValue, setFormValue])

  /* reset upload image error msg on selecting new image */
  useEffect(() => {
    setUploadImgError(null)
  }, [imagesValue, setUploadImgError])

  /* map post data to the form in edit mode */
  useEditPostDataMap(editModePayload, setFormValue)

  /* listener to open the form from anywhere in the app */
  usePostCreateFormListener(subId, ref, getFormValues, setFormValue)

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    isEditing ? updatePost(formData, isLinkPost) : createPost(formData, createPostCb, isLinkPost)
  })

  /**
   * custom reset form
   * - keep subId on creating post on subreddit page
   * - keep title on switching post type (post => link & vice versa)
   */
  function resetForm(isSwitchType?: boolean) {
    reset({ subreddit_id: subId, title: !isSwitchType ? undefined : titleValue })
  }

  /* Cb to reset the form */
  function createPostCb() {
    setTimeout(() => {
      setIsLinkPost(false)
      resetForm()
    }, 100)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <RdCard sx={{ p: { xs: 2, sm: 1.5 }, opacity: isDisabled ? 0.5 : 1 }}>
        <form onSubmit={onSubmit}>
          <Stack direction={formOpened ? { xs: 'column', sm: 'row' } : 'row'} spacing={{ xs: 1, sm: '0' }}>
            {/* ----------------------------left column---------------------------- */}
            {(!isMobile || !formOpened) && <AvatarColumn userName={userName} />}

            {/* ----------------------------main section---------------------------- */}
            <Stack spacing={1.5} flex={1}>
              {/* Title input */}
              <RdInput<TCardCreatePostForm>
                ref={ref}
                bgcolor="white"
                flex={1}
                control={control}
                name={'title' as Path<TCardCreatePostForm>}
                indentedHelper
                placeholder="Create Post"
                registerOptions={{ validate: (val) => postTitleValidation(val) }}
              />

              {/* Rest of the form (only show on form focused) */}
              <MainForm<TCardCreatePostForm>
                open={formOpened}
                resetForm={resetForm}
                setFormValue={setFormValue}
                isDirty={isDirty}
                loading={loading}
                isLinkPost={isLinkPost}
                control={control}
                imagesValue={imagesValue}
                subId={subId}
                setIsLinkPost={setIsLinkPost}
                uploadImgError={uploadImgError}
              />
            </Stack>

            {/* ----------------------------right column---------------------------- */}
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
                resetForm={resetForm}
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
