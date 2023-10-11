import { SUBREDDIT_TYPE } from '@/constants/enums'
import { LockIcon, PersonIcon, RemoveRedEyeIcon } from '@/constants/icons'
import { TCommunityCreatorForm, TCommunityCreatorProps, TCommunityTypeOPtions } from '@/constants/types'
import { ADD_SUBREDDIT } from '@/graphql/mutations'
import { ApolloError, useMutation } from '@apollo/client'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BottomNavigator, IsChildrenGroupCheckbox, RdInput, RdRadioGroup, TopicDropdown } from '..'

export const groupTypeOptions: TCommunityTypeOPtions[] = [
  {
    label: (
      <Stack direction="row" alignItems="center">
        <PersonIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={600} component="span">
          Public
        </Typography>
        <span style={{ padding: '0 0.5rem' }}>•</span>
        <Typography variant="body1" sx={{ color: 'hintText.main' }}>
          Anyone can view, post, and comment to this community
        </Typography>
      </Stack>
    ),
    value: 'public',
    disabled: false
  },
  {
    label: (
      <Stack direction="row" alignItems="center">
        <LockIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={600} component="span">
          Private
        </Typography>
        <span style={{ padding: '0 0.5rem' }}>•</span>
        <Typography variant="body1" sx={{ color: 'hintText.main' }}>
          Only approved users can view and submit to this community
        </Typography>
      </Stack>
    ),
    value: 'private',
    disabled: false
  },
  {
    label: (
      <Stack direction="row" alignItems="center">
        <RemoveRedEyeIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={600} component="span">
          Restricted
        </Typography>
        <span style={{ padding: '0 0.5rem' }}>•</span>
        <Typography variant="body1" sx={{ color: 'hintText.main' }}>
          Anyone can view this community, but only approved users can post
        </Typography>
      </Stack>
    ),
    value: 'restricted',
    disabled: true
  }
]

function CommunityCreator({ setOpen }: TCommunityCreatorProps) {
  const [addSubreddit] = useMutation(ADD_SUBREDDIT, {
    onCompleted: () => {
      toast.success('Your Subreddit sucessfully added!')
      setOpen(false)
    },
    onError: (error: ApolloError) => toast.error(error.message)
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TCommunityCreatorForm>({ defaultValues: { subType: SUBREDDIT_TYPE.Public, isChildrenContent: false } })

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    const { name, topic_ids, subType, isChildrenContent } = formData
    await addSubreddit({
      variables: {
        name,
        topic_ids,
        subType,
        isChildrenContent
      }
    })
  })

  return (
    <Box p={5} height="100vh" display="grid">
      <form onSubmit={onSubmit} style={{ display: 'grid' }}>
        <Stack position="relative" display="flex">
          <Typography variant="h5">Create a community</Typography>
          <Divider sx={{ my: 2 }} />

          {/* Community name & Topic */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            Name
          </Typography>
          <Typography variant="body1" component="p" sx={{ color: 'hintText.main' }}>
            Community names including capitalization cannot be changed.
          </Typography>
          <Stack direction="row" gap={1} sx={{ mt: 2 }}>
            <RdInput control={control} name="name" helper="21 Characters remaining" width="60%" bgcolor="white" />
            <TopicDropdown control={control} name="topic_ids" />
          </Stack>

          {/* Community types  */}
          <RdRadioGroup<TCommunityCreatorForm>
            options={groupTypeOptions}
            name="subType"
            control={control}
            label={
              <Typography variant="h5" sx={{ mt: 2 }}>
                Community type
              </Typography>
            }
          />

          {/* Community isChildrenGroup */}
          <IsChildrenGroupCheckbox<TCommunityCreatorForm> name="isChildrenContent" control={control} />

          {/* bottom button controller */}
          <BottomNavigator setOpen={setOpen} />
        </Stack>
      </form>
    </Box>
  )
}

export default CommunityCreator
