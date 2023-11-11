import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { TCardUserInfoForm, TCardUserInfoProps } from '@/constants/types'
import { useUserUpdate } from '@/hooks'
import { CardContent, Divider } from '@/mui'
import { Dayjs } from 'dayjs'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RdCard, RdToast } from '../..'
import { UserButtons, UserInfoEmail, UserInfoExtra, UserInfoFollower, UserInfoHeader, UserInfoMedia } from './components/'

function CardUserInfo({ user, loading: userLoading }: TCardUserInfoProps) {
  const { control, setValue, getValues, handleSubmit, clearErrors } = useForm<TCardUserInfoForm>()
  const { session } = useAppSession()
  const { updateUser } = useUserUpdate()
  const isMe = session?.userDetail?.username === user?.username

  /* custom default values */
  const { fullName, dob } = user || {}
  const defaultValues = useMemo(
    () => ({
      fullName: fullName == null || fullName === '' ? 'Anonymous' : fullName,
      dob
    }),
    [fullName, dob]
  )

  useEffect(() => {
    if (user) {
      setValue('fullName', defaultValues.fullName as string)
      setValue('dob', defaultValues.dob as string)
    }
  }, [user, setValue, defaultValues])

  /* onSubmit */
  async function onSubmitField(field: keyof TCardUserInfoForm, submitVal: Dayjs | string | null) {
    const value = submitVal || getValues(field)

    if (user && value && user[field] !== value) {
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

  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      {!userLoading ? (
        <>
          <UserInfoMedia user={user} />
          <form onSubmit={(e) => e.preventDefault()}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              {/* Usser avatar & cover */}
              <UserInfoHeader<TCardUserInfoForm> control={control} onSubmitField={onSubmitField} user={user} isMe={isMe} />
              <Divider sx={{ my: 1 }} />

              {/* User email */}
              <UserInfoEmail user={user} />
              <Divider sx={{ my: 1 }} />

              {/* User karma & cake day */}
              <UserInfoExtra<TCardUserInfoForm> isMe={isMe} user={user} control={control} onSubmitField={onSubmitField} />
              <Divider sx={{ my: 1 }} />

              {/* User follower */}
              <UserInfoFollower user={user} />
            </CardContent>

            {/* Action buttons */}
            <UserButtons user={user} isMe={isMe} />
          </form>
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardUserInfo
