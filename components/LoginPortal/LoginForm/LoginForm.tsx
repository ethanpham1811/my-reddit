import { RdButton, RdInput } from '@/components'
import { Link, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

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
    watch,
    control,
    formState: { errors }
  } = useForm<TLoginForm>()

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    const { username, password } = formData
    await login({
      variables: {
        username,
        password
      }
    })
    reset()
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <RdInput<TLoginForm> bgcolor="white" flex={1} control={control} name="username" placeholder="Username" />
        <RdInput<TLoginForm> bgcolor="white" flex={1} control={control} name="password" placeholder="Password" />
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
