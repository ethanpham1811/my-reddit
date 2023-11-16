import { SUBREDDIT_TYPE } from '@/constants/enums'
import { TCommunityCreatorForm, TCommunityCreatorProps } from '@/constants/types'
import { useSubredditCreate } from '@/hooks'
import { Box, Divider, Stack, Typography } from '@/mui'
import { subnameValidation } from '@/src/formValidations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BottomNavigator, IsChildrenGroupCheckbox, RdInput, TopicDropdown } from '..'
import CommunityTypeRadio from './CommunityTypeRadio/CommunityTypeRadio'

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
    <Box>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
        <Stack position="relative" display="flex" flex={1} px={{ xs: 2, md: 5 }} pt={{ xs: 1, md: 5 }} pb={{ xs: 3, md: 5 }}>
          <Typography variant="h5" fontWeight={{ xs: 700, md: 500 }} color={{ xs: 'orange.main', md: 'inherit' }} paddingY={{ xs: 1, md: 0 }}>
            Create a community
          </Typography>
          <Divider sx={{ my: { xs: 1, md: 2 } }} />

          {/* Community name & Topic */}
          <Typography variant="h5" sx={{ mt: { xs: 0, md: 2 } }}>
            Name
          </Typography>
          <Typography variant="body1" component="p" sx={{ color: 'hintText.main' }}>
            Community names including capitalization cannot be changed.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ mt: 2 }}>
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
            <TopicDropdown<TCommunityCreatorForm>
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
      </form>
    </Box>
  )
}

export default CommunityCreator
