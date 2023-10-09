import { RdButton, RdInput } from '@/components'
import { CircularProgress, Link, Stack, Typography } from '@mui/material'
import { signIn } from 'next-auth/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PasswordEye from '../PasswordEye'

type TLoginFormProps = {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>
  newUsername: string | null
}
type TLoginForm = {
  username: string
  password: string
}
function LoginForm({ setIsLoginForm, newUsername }: TLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  /* form controllers */
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<TLoginForm>()

  useEffect(() => {
    newUsername && setValue('username', newUsername)
  }, [newUsername, setValue])

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true)
    const { username, password } = formData
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    })
    console.log(result)
    result?.error
      ? setError(true) // Display an error message
      : toast.success('login succeeded')
    setLoading(false)
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ width: { xs: '400px', sm: '250px' } }}>
        {newUsername && (
          <Stack alignItems="center">
            <Typography sx={{ color: 'hintText.main' }}>
              Welcome <Typography sx={{ color: 'orange.main' }}>{newUsername}</Typography>!
            </Typography>
            <Typography fontSize="0.8rem">Please login with your account</Typography>
          </Stack>
        )}
        {error && (
          <Stack alignItems="center">
            <Typography fontSize="0.8rem" sx={{ color: 'orange.main' }}>
              Invalid username or password
            </Typography>
          </Stack>
        )}
        <RdInput<TLoginForm>
          registerOptions={{
            required: 'Username is required'
          }}
          bgcolor="white"
          flex={1}
          control={control}
          name="username"
          placeholder="Username"
        />
        <RdInput<TLoginForm>
          registerOptions={{
            required: 'Password is required'
          }}
          type={showPassword ? 'text' : 'password'}
          endIcon={<PasswordEye showPassword={showPassword} setShowPassword={setShowPassword} />}
          bgcolor="white"
          flex={1}
          control={control}
          name="password"
          placeholder="Password"
          focused={!!newUsername}
        />
        <RdButton disabled={loading} text="Login" type="submit" endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />} />
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
