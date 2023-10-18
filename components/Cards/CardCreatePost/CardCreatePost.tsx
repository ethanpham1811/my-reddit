import { useForm } from 'react-hook-form'

import { useAppSession } from '@/components/Layouts/MainLayout'
import { TCardCreatePostForm } from '@/constants/types'
import useAddPost from '@/hooks/useAddPos'
import { OnlineDotStyle } from '@/mui/styles'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { Avatar, Box, Stack } from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { RdCard, RdInput } from '../..'
import { generateUserImage, postTitleValidation } from '../../../services'
import MainForm from './components/MainForm'
import Tools from './components/Tools'

function CardCreatePost({ subId }: { subId?: number | undefined }) {
  const { session } = useAppSession()
  const { createPost, loading } = useAddPost()
  const ref = useRef<HTMLInputElement | null>(null)
  const [isLinkPost, setIsLinkPost] = useState(false)
  const [focused, setFocused] = useState(false)
  const userName: string | undefined | null = session?.userDetail?.username

  /* form controllers */
  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm<TCardCreatePostForm>()
  const titleValue = watch('title')
  const imagesValue = watch('images')

  /* Event subscriber for opening the form from somewhere else */
  useEffect(() => {
    eventEmitter.subscribe(Events.OPEN_CREATE_POST_FORM, (state) => {
      ref?.current?.focus()
      setFocused(state)
    })
    return () => eventEmitter.unsubscribe(Events.OPEN_CREATE_POST_FORM)
  }, [setValue])

  /* form submit handler */
  const onSubmit = handleSubmit(
    async (formData) => createPost(formData, reset, isLinkPost, subId),
    (err) => toast.error('Post failed, please try again')
  )

  return (
    <RdCard sx={{ p: 1.5 }} onBlur={() => setFocused(false)}>
      <form onSubmit={onSubmit}>
        <Stack direction="row">
          {/* left column */}
          <Box width={50}>
            <OnlineDotStyle overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
              <Link href={`/u/${userName}`}>
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    backgroundColor: 'inputBgOutfocused.main',
                    border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
                  }}
                  alt={userName || ''}
                  src={generateUserImage(userName || 'seed')}
                />
              </Link>
            </OnlineDotStyle>
          </Box>

          {/* main section */}
          <Stack spacing={1.5} flex={1}>
            <RdInput<TCardCreatePostForm>
              ref={ref}
              bgcolor="white"
              flex={1}
              control={control}
              name="title"
              indentedHelper
              placeholder="Create Post"
              registerOptions={{ validate: (val) => postTitleValidation(val) }}
            />
            {(!!titleValue || focused) && <MainForm isLinkPost={isLinkPost} control={control} imagesValue={imagesValue} subId={subId} />}
          </Stack>

          {/* right column */}
          <Box width={40}>
            <Tools<TCardCreatePostForm>
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
