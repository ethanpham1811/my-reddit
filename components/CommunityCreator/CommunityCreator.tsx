import { DEFAULT_GROUP_TYPE } from '@/constants/enums'
import { LockIcon, PersonIcon, RemoveRedEyeIcon } from '@/constants/icons'
import { TCommuinityCreatorForm, TCommunityCreatorProps, TCommunityTypeOPtions } from '@/constants/types'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BottomNavigator, IsChildrenGroupCheckbox, RdInput, RdRadioGroup } from '..'

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
    value: 'public'
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
    value: 'restricted'
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
    value: 'private'
  }
]

function CommunityCreator({ setOpen }: TCommunityCreatorProps) {
  const {
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<TCommuinityCreatorForm>()

  /* set group type default value */
  useEffect(() => {
    setValue('type', DEFAULT_GROUP_TYPE)
  }, [])

  const onSubmit = handleSubmit(() => {})

  return (
    <Box p={5} height="100vh" display="grid">
      <form onSubmit={onSubmit} style={{ display: 'grid' }}>
        <Stack position="relative" display="flex">
          <Typography variant="h5">Create a community</Typography>
          <Divider sx={{ my: 2 }} />

          {/* Community name */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            Name
          </Typography>
          <Typography variant="body1" component="p" sx={{ color: 'hintText.main' }}>
            Community names including capitalization cannot be changed.
          </Typography>
          <RdInput sx={{ mt: 2 }} control={control} name="name" helper="21 Characters remaining" width="100%" bgcolor="white.main" />

          {/* Community types  */}
          <RdRadioGroup<TCommuinityCreatorForm>
            options={groupTypeOptions}
            name="type"
            control={control}
            label={
              <Typography variant="h5" sx={{ mt: 2 }}>
                Community type
              </Typography>
            }
          />

          {/* Community isChildrenGroup */}
          <IsChildrenGroupCheckbox<TCommuinityCreatorForm> name="isChildrenContent" control={control} />

          {/* bottom button controller */}
          <BottomNavigator setOpen={setOpen} />
        </Stack>
      </form>
    </Box>
  )
}

export default CommunityCreator
