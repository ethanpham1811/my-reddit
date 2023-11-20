import { useAppSession } from '@/src/Layouts/MainLayout'
import { RdToast } from '@/src/components'
import { TCardUserInfoForm, TUserDetail } from '@/src/constants/types'
import { useEffect, useMemo } from 'react'
import { Control, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type TUseUserInfoFormResponse = {
  control: Control<TCardUserInfoForm>
  onChangeUserInfo: (field: keyof TCardUserInfoForm, submitVal: unknown) => Promise<void>
}

function useUserInfoForm(user: TUserDetail | null, updateUser: any): TUseUserInfoFormResponse {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { control, setValue, getValues, handleSubmit, clearErrors } = useForm<TCardUserInfoForm>({ mode: 'all' })

  /* custom default values */
  const { fullName, dob } = user || {}
  const defaultValues = useMemo(
    () => ({
      fullName: fullName == null || fullName === '' ? 'Anonymous' : fullName,
      dob
    }),
    [fullName, dob]
  )

  // populate current user info to the form
  useEffect(() => {
    if (user) {
      setValue('fullName', defaultValues.fullName as string)
      setValue('dob', defaultValues.dob as string)
    }
  }, [user, setValue, defaultValues])

  /* onSubmit */
  async function onChangeUserInfo(field: keyof TCardUserInfoForm, submitVal: unknown) {
    const value = submitVal || getValues(field)

    if (me && user && value && user[field] !== value) {
      handleSubmit(
        async () => {
          toast.promise(updateUser(field, value), {
            loading: <RdToast message="Updating your profile..." />,
            success: <RdToast message="Profile saved!" />,
            error: <RdToast message="Could not save." />
          })
        },
        () => {
          // reset the field with initial value
          setValue(field, user?.[field] as any)
        }
      )()
    } else user && setValue(field, user[field] as any) // reset the field with initial value

    clearErrors()
  }

  return { control, onChangeUserInfo }
}

export default useUserInfoForm
