import { useForm } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { POST_MUTATION_MODE } from '@/constants/enums'
import { TCardCreatePostForm, TEditModePayload } from '@/constants/types'
import usePostCreateAndEdit from '@/hooks/usePostCreateAndEdit'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { RdCard } from '../..'
import AvatarColumn from './components/AvatarColumn'
import FormColumn from './components/FormColumn'
import Tools from './components/Tools'

function CardCreatePost({ subId, editModePayload }: { subId?: number | undefined; editModePayload?: TEditModePayload }) {
  const { session } = useAppSession()
  const { mutatePost, loading } = usePostCreateAndEdit()
  const [isLinkPost, setIsLinkPost] = useState(false)
  const [focused, setFocused] = useState(false)
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
    formState: { errors }
  } = useForm<TCardCreatePostForm>()
  const titleValue = watch('title')
  const imagesValue = watch('images')

  useEffect(() => {
    editModePayload?.link && setIsLinkPost(true)
  }, [setIsLinkPost, editModePayload])

  /* form submit handler */
  const onSubmit = handleSubmit(
    async (formData) => {
      // edit post
      if (isEditing) {
        await mutatePost(formData, reset, isLinkPost, POST_MUTATION_MODE.Edit)
        navigate(`/r/${subName}/post/${postid}`)
      }
      //create post
      else {
        mutatePost(formData, reset, isLinkPost, POST_MUTATION_MODE.Create)
      }
    },
    (err) => toast.error('Post failed, please try again')
  )

  return (
    <RdCard sx={{ p: 1.5 }} onBlur={() => setFocused(false)}>
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
            setFocused={setFocused}
            focused={focused}
            loading={loading}
            isLinkPost={isLinkPost}
            subId={subId}
            imagesValue={imagesValue}
          />

          {/* right column */}
          <Box width={40}>
            <Tools<TCardCreatePostForm>
              isEditing={isEditing}
              control={control}
              isFormClosed={!titleValue && !focused}
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
