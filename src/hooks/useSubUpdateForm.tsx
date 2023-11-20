import { useAppSession } from '@/src/Layouts/MainLayout'
import { RdToast } from '@/src/components'
import { TSubredditDetail, TSubredditEditForm } from '@/src/constants/types'
import { Control, UseFormSetValue, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type TUseSubTopNavFormResponse = {
  control: Control<TSubredditEditForm>
  onChangeSubInfo: (field: keyof TSubredditEditForm, val: unknown) => Promise<void>
  setFormValue: UseFormSetValue<TSubredditEditForm>
}

type TUpdateSubFunction = (id: string, key: keyof TSubredditEditForm, newVal: string) => Promise<any>

function useSubUpdateForm(subreddit: TSubredditDetail | null, updateSub: TUpdateSubFunction): TUseSubTopNavFormResponse {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { control, setValue: setFormValue, handleSubmit, clearErrors } = useForm<TSubredditEditForm>({ mode: 'all' })

  /* Edit subreddit request */
  async function onChangeSubInfo(field: keyof TSubredditEditForm, value: unknown) {
    if (me && subreddit && value && subreddit[field] !== value) {
      handleSubmit(
        async () => {
          toast.promise(updateSub(subreddit?.id.toString(), field, value as string), {
            loading: <RdToast message="Updating Subreddit..." />,
            success: <RdToast message="Subreddit saved!" />,
            error: <RdToast message="Could not save." />
          })
        },
        () => {
          // reset the field with initial value
          setFormValue(field, subreddit?.[field] as any)
        }
      )()
    } else subreddit && setFormValue(field, subreddit[field] as any) // reset the field with initial value

    clearErrors()
  }

  return { control, onChangeSubInfo, setFormValue }
}

export default useSubUpdateForm
