import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { TCardCreatePostForm, TSession } from '@/constants/types'
import { ADD_POST } from '@/graphql/mutations'
import { GET_POST_LIST_BY_SUB_ID } from '@/graphql/queries'
import { OnlineDotStyle } from '@/mui/styles'
import { useMutation } from '@apollo/client'
import { Avatar, Stack } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { RdCard, RdInput, RdToast } from '../..'
import { generateUserImage, postTitleValidation, uploadFiles } from '../../../services'
import MainForm from './components/MainForm'
import Tools from './components/Tools'

function CardCreatePost({ subId }: { subId?: number | undefined }) {
  const { data: session }: TSession = useSession()
  const [showLinkInput, setShowLinkInput] = useState(false)
  const userName: string | undefined | null = session?.user?.name

  /* mutations */
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POST_LIST_BY_SUB_ID, variables: { id: subId } }]
  })
  // FIXME: adjust this to modify cache

  /* form controllers */
  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<TCardCreatePostForm>()
  const titleValue = watch('title')
  const imagesValue = watch('images')
  // titleValue === '' && reset()

  /* form submit handler */
  const onSubmit = handleSubmit(
    async (formData) => {
      const { body, subreddit_id, title } = formData
      let images: string[] | null = null

      // if there is any uploaded images
      if (formData.images && formData.images.length > 0) {
        images = await uploadFiles(formData.images)
      }

      toast.promise(
        addPost({
          variables: {
            body,
            subreddit_id: subId ?? subreddit_id,
            title,
            user_id: session?.user?.id,
            images
          }
        }).then(() => reset()),
        {
          loading: <RdToast message="Post processing..." />,
          success: <RdToast message="Successfully posted" />,
          error: <RdToast message="Posting failed" />
        }
      )
    },
    (err) => console.log(err)
  )

  return (
    <RdCard sx={{ p: 1.5 }}>
      <form onSubmit={onSubmit}>
        <Stack direction="row" useFlexGap spacing={1}>
          <OnlineDotStyle overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Link href={`/u/${session?.user?.name}`}>
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
          <RdInput<TCardCreatePostForm>
            bgcolor="white"
            flex={1}
            control={control}
            name="title"
            indentedHelper
            placeholder="Create Post"
            registerOptions={{ validate: (val) => postTitleValidation(val) }}
          />
          <Tools<TCardCreatePostForm> control={control} titleValue={titleValue} setShowLinkInput={setShowLinkInput} showLinkInput={showLinkInput} />
        </Stack>
        {!!titleValue && <MainForm showLinkInput={showLinkInput} control={control} imagesValue={imagesValue} subId={subId} />}
      </form>
    </RdCard>
  )
}

export default CardCreatePost
