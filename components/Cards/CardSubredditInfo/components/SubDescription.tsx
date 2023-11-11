import { useAppSession } from '@/components/Layouts/MainLayout'
import { TCardSubredditInfoForm, TSubredditDetail } from '@/constants/types'
import { useSubredditUpdate } from '@/hooks'
import { Typography } from '@/mui'
import { textValidation } from '@/src/formValidations'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RdInlineInput, RdToast } from '../../..'

function SubDescription({ subreddit }: { subreddit: TSubredditDetail | null }) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { control, setValue, getValues, handleSubmit, clearErrors } = useForm<TCardSubredditInfoForm>()
  const isMySub: boolean = subreddit?.user?.username === me?.username
  const { updateSub } = useSubredditUpdate()
  const description = subreddit?.description

  useEffect(() => {
    description && setValue('description', description as string)
  }, [description, setValue])

  /* Edit headline request */
  async function onChangeDescription(field: keyof TCardSubredditInfoForm, val: unknown) {
    if (typeof val !== 'string' || !subreddit?.id || !val) return
    const value = val || getValues(field)

    if (me && value && value !== description) {
      handleSubmit(
        async () => {
          toast.promise(updateSub(subreddit?.id.toString(), { description: val }), {
            loading: <RdToast message="Updating Subreddit..." />,
            success: <RdToast message="Subreddit saved!" />,
            error: <RdToast message="Could not save." />
          })
        },
        () => {
          // reset the field with initial value
          setValue('description', description || '')
        }
      )()
    } else setValue('description', description || '') // reset the field with initial value

    clearErrors()
  }
  return (
    <Typography variant="subtitle1" color="black" fontWeight={500} fontSize="14px">
      {isMySub ? (
        <RdInlineInput<TCardSubredditInfoForm>
          registerOptions={{ validate: (val) => textValidation(val, 200) }}
          onFieldSubmit={onChangeDescription}
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
