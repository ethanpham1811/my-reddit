import { RdButton, RdInput } from '@/components'
import { Link, Stack, Typography } from '@mui/material'
import { signIn } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type TLoginFormProps = {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>
}
type TLoginForm = {
  username: string
  password: string
}
function LoginForm({ setIsLoginForm }: TLoginFormProps) {
  /* mutations */
  // const [addPost] = useMutation(ADD_POST, {
  //   onCompleted: () => {
  //     toast.success('Your post sucessfully added!')
  //   },
  //   onError: (error: ApolloError) => {
  //     toast.error(error.message)
  //   },
  //   refetchQueries: [GET_POST_LIST, 'postList']
  // })

  /* form controllers */
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TLoginForm>()

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    const { username, password } = formData
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    })
    result?.error
      ? toast.error(result.error) // Display an error message
      : toast.success('login succeeded')
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <RdInput<TLoginForm> bgcolor="white" flex={1} control={control} name="username" placeholder="Username" />
        <RdInput<TLoginForm> type="password" bgcolor="white" flex={1} control={control} name="password" placeholder="Password" />
        <RdButton text="Login" type="submit" />
        <Typography variant="subtitle1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
          Not Registered?{' '}
          <Link sx={{ cursor: 'pointer', color: 'blue.main' }} onClick={() => setIsLoginForm(false)}>
            Signup
          </Link>
        </Typography>
      </Stack>
    </form>
  )
}

export default LoginForm
