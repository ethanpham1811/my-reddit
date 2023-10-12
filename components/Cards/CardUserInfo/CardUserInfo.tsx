import { RdSkeleton } from '@/components/Skeletons'
import { TCardUserInfoForm, TCardUserInfoProps, TSession } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { CardContent, Divider } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RdCard, RdToast } from '../..'
import UserButtons from './components/UserButtons'
import UserInfoEmail from './components/UserInfoEmail'
import UserInfoExtra from './components/UserInfoExtra'
import UserInfoFollower from './components/UserInfoFollower'
import UserInfoHeader from './components/UserInfoHeader'
import UserInfoMedia from './components/UserInfoMedia'

function CardUserInfo({ user, loading: userLoading }: TCardUserInfoProps) {
  const { control, setValue, getValues, handleSubmit } = useForm<TCardUserInfoForm>()
  const { data, status }: TSession = useSession()
  const isMe = data?.user?.name === user?.username

  /* custom default values */
  const { fullName, email, username } = user || {}
  const defaultValues = useMemo(
    () => ({
      fullName: fullName == null || fullName === '' ? username : fullName,
      email: email == null || email === '' ? 'N/A' : email
    }),
    [fullName, email, username]
  )

  useEffect(() => {
    if (user) {
      setValue('fullName', defaultValues.fullName as string)
      setValue('email', defaultValues.email as string)
    }
  }, [user, setValue, defaultValues])

  /* user mutations */
  const [mutateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USER_BY_USERNAME, variables: { username: user?.username } }]
  })

  /* onSubmit */
  async function onSubmitField(field: keyof TCardUserInfoForm) {
    const value = getValues(field)

    if (user && value != null && value !== '' && user[field] !== value) {
      handleSubmit(
        async (formData) => {
          toast.promise(
            mutateUser({
              variables: {
                id: user.id,
                [field]: value
              }
            }),
            {
              loading: <RdToast message="Updating your profile..." />,
              success: <RdToast message="Profile saved!" />,
              error: <RdToast message="Could not save." />
            }
          )
        },
        (errors) => {
          // reset the field with initial value
          setValue(field, user?.[field] as any)
        }
      )()
    } else user && setValue(field, user[field] as any) // reset the field with initial value
  }

  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      {!userLoading ? (
        <>
          <UserInfoMedia user={user} />
          <form onSubmit={(e) => e.preventDefault()}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              {/* Usser avatar & cover */}
              <UserInfoHeader<TCardUserInfoForm> isMe={isMe} getValues={getValues} control={control} onSubmitField={onSubmitField} user={user} />
              <Divider sx={{ my: 1 }} />

              {/* User email */}
              <UserInfoEmail<TCardUserInfoForm> isMe={isMe} getValues={getValues} control={control} onSubmitField={onSubmitField} />
              <Divider sx={{ my: 1 }} />

              {/* User karma & cake day */}
              <UserInfoExtra user={user} />
              <Divider sx={{ my: 1 }} />

              {/* User follower */}
              <UserInfoFollower user={user} />
            </CardContent>

            {/* Action buttons */}
            <UserButtons user={user} isMe={isMe} status={status} />
          </form>
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardUserInfo
