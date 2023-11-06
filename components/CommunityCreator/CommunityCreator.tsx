import { SUBREDDIT_TYPE } from '@/constants/enums'
import { TCommunityCreatorForm, TCommunityCreatorProps } from '@/constants/types'
import { useSubredditCreate } from '@/hooks'
import { Box, Divider, Stack, Typography } from '@/mui'
import { subnameValidation } from '@/src/formValidations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BottomNavigator, IsChildrenGroupCheckbox, RdInput, RdRadioGroup, TopicDropdown } from '..'
import { groupTypeOptions } from './data'

function CommunityCreator({ setOpen }: TCommunityCreatorProps) {
  const { createSubreddit, loading } = useSubredditCreate()
  const { push: redirect } = useRouter()
  const { handleSubmit, control } = useForm<TCommunityCreatorForm>({ defaultValues: { subType: SUBREDDIT_TYPE.Public, isChildrenContent: false } })

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    const res = await createSubreddit(formData)

    // remain the current page with drawer kept opened
    if (res?.error) return toast.error('Create subreddit failed, please try again')

    // redirect to created subreddit page & close the drawer
    toast.success('Your Subreddit sucessfully added!')
    redirect(`/r/${formData.name}`)
    setOpen(false)
  })

  return (
    <Box px={{ xs: 2, sm: 5 }} py={{ xs: 1, sm: 5 }} height="100vh" display="grid">
      <form onSubmit={onSubmit} style={{ display: 'grid' }}>
        <Stack position="relative" display="flex">
          <Typography variant="h5" fontWeight={{ xs: 700, sm: 500 }} color={{ xs: 'orange.main', sm: 'inherit' }} paddingY={{ xs: 1, sm: 0 }}>
            Create a community
          </Typography>
          <Divider sx={{ my: { xs: 1, sm: 2 } }} />

          {/* Community name & Topic */}
          <Typography variant="h5" sx={{ mt: { xs: 0, sm: 2 } }}>
            Name
          </Typography>
          <Typography variant="body1" component="p" sx={{ color: 'hintText.main' }}>
            Community names including capitalization cannot be changed.
          </Typography>
          <Stack direction="row" gap={1} sx={{ mt: 2 }}>
            <RdInput<TCommunityCreatorForm>
              registerOptions={{ validate: (val): string | boolean => subnameValidation(val) }}
              control={control}
              name="name"
              helper="21 Characters remaining"
              width="60%"
              bgcolor="white"
            />
            <TopicDropdown<TCommunityCreatorForm> registerOptions={{ required: 'Please choose a topic' }} control={control} name="topic_ids" />
          </Stack>

          {/* Community types  */}
          <RdRadioGroup<TCommunityCreatorForm>
            options={groupTypeOptions}
            name="subType"
            control={control}
            sx={{ mt: 1 }}
            label={
              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  color: 'black.main'
                }}
              >
                Community type
              </Typography>
            }
          />

          {/* Community isChildrenGroup */}
          <IsChildrenGroupCheckbox<TCommunityCreatorForm> name="isChildrenContent" control={control} />

          {/* bottom button controller */}
          <BottomNavigator loading={loading} setOpen={setOpen} />
        </Stack>
      </form>
    </Box>
  )
}

export default CommunityCreator
