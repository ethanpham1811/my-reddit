import { RdInput, RdTopicDropdown } from '@/src/components'
import { SUBREDDIT_TYPE } from '@/src/constants/enums'
import { TCommunityCreatorForm, TCommunityCreatorProps } from '@/src/constants/types'
import { useSubredditCreate } from '@/src/hooks'
import { Box, Divider, Stack, Typography } from '@/src/mui'
import { subnameValidation } from '@/src/services/formValidations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BottomNavigator, IsChildrenGroupCheckbox } from './components'
import CommunityTypeRadio from './components/CommunityTypeRadio'

function CommunityCreator({ setOpen }: TCommunityCreatorProps) {
  const { createSubreddit, loading } = useSubredditCreate()
  const { push: redirect } = useRouter()
  const { handleSubmit, control, setValue, watch, trigger } = useForm<TCommunityCreatorForm>({
    mode: 'all',
    defaultValues: { subType: SUBREDDIT_TYPE.Public, isChildrenContent: false, topic_ids: [] }
  })
  const topicIdsValue = watch('topic_ids')

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
    <form onSubmit={onSubmit}>
      <Box height="100dvh" display="flex" flexDirection="column">
        <Stack position="relative" display="flex" flex={1} px={{ xs: 2, md: 5 }} pt={{ xs: 1, md: 5 }} pb={{ xs: 3, md: 5 }}>
          <Typography variant="h5" fontWeight={{ xs: 700, md: 500 }} color={{ xs: 'orange.main', md: 'inherit' }} paddingY={{ xs: 1, md: 0 }}>
            Create a community
          </Typography>
          <Divider sx={{ my: { xs: 1, md: 2 } }} />

          {/* name input labels */}
          <Typography variant="h5" sx={{ mt: { xs: 0, md: 2 } }}>
            Name
          </Typography>
          <Typography variant="body1" component="p" sx={{ color: 'gray.dark' }}>
            Community names including capitalization cannot be changed.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ mt: 2 }}>
            {/* Community name input */}
            <RdInput<TCommunityCreatorForm>
              registerOptions={{ validate: (val): string | boolean => subnameValidation(val) }}
              control={control}
              letterCount={20}
              name="name"
              bgcolor="primary"
              height="22.25px"
              flex={1}
              placeholder={`What's on your mind?`}
            />

            {/* Topic dropdown */}
            <RdTopicDropdown<TCommunityCreatorForm>
              triggerValidation={trigger}
              control={control}
              setFormValue={setValue}
              selectedTopics={topicIdsValue}
            />
          </Stack>

          {/* Community types  */}
          <CommunityTypeRadio<TCommunityCreatorForm> control={control} />

          {/* Community isChildrenGroup */}
          <IsChildrenGroupCheckbox<TCommunityCreatorForm> control={control} />
        </Stack>

        {/* bottom button controller */}
        <BottomNavigator loading={loading} setOpen={setOpen} />
      </Box>
    </form>
  )
}

export default CommunityCreator
