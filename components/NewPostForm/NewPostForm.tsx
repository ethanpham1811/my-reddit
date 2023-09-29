import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { client } from '@/apollo-client'
import { ImageOutlinedIcon, LinkIcon } from '@/constants'
import { Post } from '@/constants/types'
import { ADD_POST, ADD_SUBREDDIT } from '@/graphql/mutations'
import { GET_SUBREDDIT_BY_TOPIC } from '@/graphql/quries'
import { OnlineDotStyle } from '@/mui/styles'
import { ApolloError, useMutation } from '@apollo/client'
import { Avatar, IconButton, Stack, Tooltip } from '@mui/material'
import toast from 'react-hot-toast'
import { RdCard, RdInput } from '..'
import { generateUserImage } from '../utilities'

function NewPostForm() {
  const { data: session } = useSession()
  const userName: string = session?.user?.name || 'Guest user'
  const [addSubreddit] = useMutation(ADD_SUBREDDIT, {
    onError: (error: ApolloError) => {
      toast.error(error.message)
    }
  })
  const [addPost] = useMutation(ADD_POST, {
    onCompleted: () => {
      toast.success('Your post sucessfully added!')
    },
    onError: (error: ApolloError) => {
      toast.error(error.message)
    }
  })

  const {
    register,
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<Post>()

  const onSubmit = handleSubmit(async (formData) => {
    const res = await client.query({ query: GET_SUBREDDIT_BY_TOPIC, variables: { topic: formData.subreddit } })
    const subredditExists = res?.data?.subredditListByTopic?.length > 0

    if (!subredditExists) {
      addSubreddit({ variables: { topic: formData.subreddit } }).then((res) => {
        const newSubredditId = res?.data?.insertSubreddit.id
        addPost({
          variables: {
            body: formData.body,
            image: '',
            subreddit_id: newSubredditId,
            title: formData.title,
            username: session?.user?.name
          }
        })
      })
    }
    // clear the form
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
          <RdInput<Post> control={control} name="title" placeholder={session ? 'Create Post' : 'Please login first'} />
          <Stack direction="row">
            <Tooltip title="Create Media Post">
              <IconButton>
                <ImageOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Link Post">
              <IconButton>
                <LinkIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        {!!watch('title') && (
          <>
            <RdInput<Post> control={control} name="body" placeholder="Body" />
            <RdInput<Post> control={control} name="subreddit" placeholder="Subreddit" />
            <button type="submit">Post</button>
          </>
          // {/* <ErrorMessage errors={errors} render={({ message }) => <p>{message}</p>} /> */}
        )}
      </form>
    </RdCard>
  )
}

export default NewPostForm
