import { RdButton, RdInput } from '@/components'
import { Link, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

type TRegisterFormProps = {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>
}
type TRegisterForm = {
  username: string
  password: string
  repassword: string
}
function RegisterForm({ setIsLoginForm }: TRegisterFormProps) {
  /* form controllers */
  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<TRegisterForm>()

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    const { username, password, repassword } = formData
    if (password !== repassword) return

    const result = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    })
    // result?.error
    //   ? toast.error(result.error) // Display an error message
    //   : toast.success('login succeeded')
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <RdInput<TRegisterForm> bgcolor="white" flex={1} control={control} name="username" placeholder="Username" />
        <RdInput<TRegisterForm> type="password" bgcolor="white" flex={1} control={control} name="password" placeholder="Password" />
        <RdInput<TRegisterForm> type="password" bgcolor="white" flex={1} control={control} name="repassword" placeholder="Re-enter your password" />
        <RdButton text="Register" type="submit" />
        <Typography variant="subtitle1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
          Back to{' '}
          <Link sx={{ cursor: 'pointer', color: 'blue.main' }} onClick={() => setIsLoginForm(true)}>
            Login
          </Link>
        </Typography>
      </Stack>
    </form>
  )
}

export default RegisterForm
