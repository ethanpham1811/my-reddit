import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { LinkIcon } from '@/constants/icons'
import { TCardCreatePostForm } from '@/constants/types'
import { ADD_POST } from '@/graphql/mutations'
import { GET_POST_LIST } from '@/graphql/quries'
import { OnlineDotStyle } from '@/mui/styles'
import { ApolloError, useMutation } from '@apollo/client'
import { Avatar, IconButton, Stack, Tooltip } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { RdButton, RdCard, RdImageList, RdImageUploader, RdInput, RdSubredditSelect, RdTextEditor } from '../..'
import { generateUserImage, uploadFiles } from '../../utilities'

function CardCreatePost() {
  const { data: session } = useSession()
  const [showLinkInput, setShowLinkInput] = useState(false)
  const userName: string = session?.user?.name || 'Guest user'

  /* mutations */
  const [addPost] = useMutation(ADD_POST, {
    onCompleted: () => {
      toast.success('Your post sucessfully added!')
    },
    onError: (error: ApolloError) => {
      toast.error(error.message)
    },
    refetchQueries: [GET_POST_LIST, 'postList']
  })

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
  titleValue === '' && reset()

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    const { body, subreddit_id, title } = formData
    let images: string[] | null = null
    if (formData.images && formData.images.length > 0) {
      images = await uploadFiles(formData.images)
    }
    await addPost({
      variables: {
        body,
        subreddit_id,
        title,
        username: session?.user?.name,
        images
      }
    })
    reset()
  })

  return (
    <RdCard>
      <form onSubmit={onSubmit}>
        <Stack direction="row" useFlexGap spacing={1}>
          <OnlineDotStyle overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar
              sx={{
                width: 38,
                height: 38,
                backgroundColor: 'inputBgOutfocused.main',
                border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
              }}
              alt={userName}
              src={generateUserImage(userName)}
            />
          </OnlineDotStyle>
          <RdInput<TCardCreatePostForm>
            bgcolor="white"
            flex={1}
            control={control}
            name="title"
            placeholder={session ? 'Create Post' : 'Please login first'}
          />
          <Stack direction="row">
            <Tooltip title="Create Media Post">
              <IconButton disabled={!watch('title')}>
                <RdImageUploader<TCardCreatePostForm> control={control} name="images" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Link Post">
              <IconButton
                disabled={!titleValue}
                sx={{ bgcolor: showLinkInput ? 'primary.main' : 'unset' }}
                onClick={() => setShowLinkInput(!showLinkInput)}
              >
                <LinkIcon sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        {!!titleValue && (
          <Stack spacing={1} sx={{ py: 1, px: '46px' }}>
            {showLinkInput && <RdInput<TCardCreatePostForm> bgcolor="white" flex={1} control={control} name="link" placeholder="Link URL" />}
            <RdTextEditor<TCardCreatePostForm> control={control} name="body" placeholder="Start your essay.." />
            {imagesValue && imagesValue.length > 0 && <RdImageList images={imagesValue} cols={5} />}
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" width="100%">
              <RdSubredditSelect control={control} name="subreddit_id" width="180px" />
              <RdButton type="submit" text={'Post'} bgcolor="blue" invertColor width="30%" />
            </Stack>
          </Stack>
          // {/* <ErrorMessage errors={errors} render={({ message }) => <p>{message}</p>} /> */}
        )}
      </form>
    </RdCard>
  )
}

export default CardCreatePost
