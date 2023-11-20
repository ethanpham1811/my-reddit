import { useAppSession } from '@/src/Layouts/MainLayout'
import { TSubredditDetail, TSubredditEditForm } from '@/src/constants/types'
import { useSubUpdateForm, useSubredditUpdate } from '@/src/hooks'
import { Typography } from '@/src/mui'
import { textValidation } from '@/src/services/formValidations'
import { useEffect } from 'react'
import { RdInlineInput } from '../../..'

function SubDescription({ subreddit }: { subreddit: TSubredditDetail | null }) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const isMySub: boolean = subreddit?.user?.username === me?.username
  const { updateSub } = useSubredditUpdate()
  const { control, onChangeSubInfo, setFormValue } = useSubUpdateForm(subreddit, updateSub)
  const { description } = subreddit || {}

  // populate current description to the form
  useEffect(() => {
    setFormValue('description', (description as string) || '')
  }, [description, setFormValue])

  return (
    <Typography variant="subtitle1" color="black" fontWeight={500} fontSize="14px">
      {isMySub ? (
        <RdInlineInput<TSubredditEditForm>
          registerOptions={{ validate: (val) => textValidation(val, 200) }}
          onFieldSubmit={onChangeSubInfo}
          control={control}
          name="description"
          endIcon
        />
      ) : (
        description || ''
      )}
    </Typography>
  )
}

export default SubDescription
