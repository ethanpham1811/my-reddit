import { RdSkeleton } from '@/components/Skeletons'
import { TUserDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { emailValidation, formatNumber, fullNameValidation, generateSeededHexColor, generateUserCover, generateUserImage } from '@/services'
import { ApolloError, useMutation } from '@apollo/client'
import { Avatar, Box, CardActions, CardContent, CardHeader, CardMedia, Divider, Stack, Typography } from '@mui/material'
import format from 'date-fns/format'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RdButton, RdCard, RdInlineInput } from '../..'

type TCardUserInfoProps = {
  user: TUserDetail | null
  loading: boolean
}
type TCardUserInfoForm = {
  email: string
  fullName: string
}
type UpdateUserValue<T extends keyof TCardUserInfoForm> = TCardUserInfoForm[T]

function CardUserInfo({ user, loading }: TCardUserInfoProps) {
  const { control, handleSubmit } = useForm<TCardUserInfoForm>()
  const { data } = useSession()
  const isMe = data?.user?.name === user?.username
  console.log(isMe)

  /* user mutations */
  const [mutateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success('Updated!')
    },
    onError: (error: ApolloError) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: GET_USER_BY_USERNAME, variables: { username: user?.username } }]
  })

  async function updateUser<T extends keyof TCardUserInfoForm>(field: T, value: UpdateUserValue<T>) {
    user &&
      value != null &&
      value !== '' &&
      (await mutateUser({
        variables: {
          id: user.id,
          [field]: value
        }
      }))
  }

  const onSubmit = (e: any, field: keyof TCardUserInfoForm) => {
    user &&
      handleSubmit((formData) => {
        if ((e.type === 'keyup' && e.key === 'Enter') || e.type === 'blur') {
          updateUser(field, formData[field])
        }
      })()
  }

  return (
    <RdCard sx={{ gap: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      {!loading ? (
        <>
          <CardMedia
            component="img"
            height={80}
            image={generateUserCover(user?.username || 'seed', 400, 100)}
            alt="user cover"
            sx={{ mx: -2, mt: -2, width: 'auto' }}
          />
          <CardHeader
            avatar={
              <Avatar
                variant="rounded"
                sx={{
                  width: 70,
                  height: 70,
                  backgroundColor: generateSeededHexColor(user?.username || 'seed'),
                  border: (theme): string => `4px solid ${theme.palette.white.main}`
                }}
                alt={`${user?.username} avatar`}
                src={generateUserImage(user?.username || 'seed')}
              />
            }
            sx={{ p: 0, mt: -5.5 }}
          />
          <form>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6" color="initial" fontWeight={700}>
                <RdInlineInput<TCardUserInfoForm>
                  editable={isMe}
                  registerOptions={{ validate: (val) => emailValidation(val) }}
                  onSubmit={(e) => onSubmit(e, 'fullName')}
                  // onBlur={(e) => onSubmit(e, 'fullName')}
                  control={control}
                  name="fullName"
                  placeholder={user?.username}
                />
              </Typography>
              <Typography variant="subtitle1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
                u/{user?.username}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" sx={{ color: 'blue.main' }}>
                <RdInlineInput<TCardUserInfoForm>
                  editable={isMe}
                  registerOptions={{ validate: (val) => fullNameValidation(val) }}
                  onSubmit={(e) => onSubmit(e, 'email')}
                  // onBlur={(e) => onSubmit(e, 'email')}
                  control={control}
                  name="email"
                  placeholder="your email"
                />
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Stack direction="row">
                <Stack flex={1}>
                  <Typography fontWeight={700} variant="body1">
                    Karma
                  </Typography>
                  <Typography variant="body1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
                    {user?.karma}
                  </Typography>
                </Stack>
                <Stack flex={1}>
                  <Typography fontWeight={700} variant="body1">
                    Cake day
                  </Typography>
                  <Typography variant="body1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
                    {user?.dob ? format(new Date(), 'PPP') : 'NaN'}
                  </Typography>
                </Stack>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="center" py={1} alignItems="center">
                <Typography variant="subtitle1" fontWeight={700}>
                  {formatNumber(user?.followers || 0)}
                </Typography>{' '}
                &nbsp;
                <Typography variant="subtitle2" sx={{ color: 'hintText.main' }}>
                  Followers
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <RdButton text={'New Post'} filled color="blue" invertColor />
            </CardActions>
          </form>
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardUserInfo
