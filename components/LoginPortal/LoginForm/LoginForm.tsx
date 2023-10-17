import { RdButton, RdInput } from '@/components'
import { emailValidation } from '@/services'
import { CircularProgress, Link, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PasswordEye from '../PasswordEye'

type TLoginFormProps = {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>
  newUserEmail: string | null
}
type TLoginForm = {
  email: string
  password: string
}
function LoginForm({ setIsLoginForm, newUserEmail }: TLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  /* form controllers */
  const { handleSubmit, control, setValue } = useForm<TLoginForm>()

  useEffect(() => {
    // set email by registered email or offer test account for demonstration
    setValue('email', newUserEmail ?? 'guest_account@gmail.com')
    !newUserEmail && setValue('password', '123123')
  }, [newUserEmail, setValue])

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true)
    const { email, password } = formData
    const res = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
    const { error } = await res.json()
    error
      ? setError(error) // Display an error message
      : toast.success('Login successfully')
    setLoading(false)
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ width: { xs: '400px', sm: '250px' } }}>
        {newUserEmail && (
          <Stack alignItems="center">
            <Typography sx={{ color: 'hintText.main' }}>
              Welcome <Typography sx={{ color: 'orange.main' }}>{newUserEmail}</Typography>!
            </Typography>
            <Typography fontSize="0.8rem">Please login with your account</Typography>
          </Stack>
        )}
        {error && (
          <Stack alignItems="center">
            <Typography fontSize="0.8rem" sx={{ color: 'orange.main' }}>
              Invalid email or password
            </Typography>
          </Stack>
        )}
        <RdInput<TLoginForm>
          registerOptions={{ validate: (val): string | boolean => emailValidation(val) }}
          bgcolor="white"
          flex={1}
          control={control}
          name="email"
          placeholder="Email"
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
          focused={!!newUserEmail}
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
