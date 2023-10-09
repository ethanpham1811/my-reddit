import { RdButton, RdInput } from '@/components'
import { passwordValidation, rePasswordValidation, usernameValidation } from '@/services'
import { CircularProgress, Link, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordEye from '../PasswordEye'

type TRegisterFormProps = {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>
  setNewUsername: Dispatch<SetStateAction<string | null>>
}
type TRegisterForm = {
  username: string
  password: string
  repassword: string
}
function RegisterForm({ setIsLoginForm, setNewUsername }: TRegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  /* form controllers */
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors }
  } = useForm<TRegisterForm>()

  /* form submit handler */
  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true)
    const { username, password, repassword } = formData
    if (password !== repassword) return

    const result: Response = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    })
    result?.status !== 200
      ? setError(true) // Display an error message
      : (setNewUsername(username), setIsLoginForm(true))
    setLoading(false)
  })

  /* register options */
  const usernameOptions = {
    validate: (val: string) => usernameValidation(val)
  }
  const passwordOptions = {
    validate: (val: string) => passwordValidation(val)
  }
  const rePasswordOptions = {
    validate: (val: string) => rePasswordValidation(val, getValues('password'))
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ width: { xs: '400px', sm: '300px' } }}>
        {error && (
          <Stack alignItems="center">
            <Typography fontSize="0.8rem" sx={{ color: 'orange.main' }}>
              There&apos;s something wrong with the server, please try again shortly
            </Typography>
          </Stack>
        )}
        <RdInput<TRegisterForm>
          autoComplete="off"
          registerOptions={usernameOptions}
          bgcolor="white"
          flex={1}
          control={control}
          name="username"
          placeholder="Username"
        />
        <RdInput<TRegisterForm>
          autoComplete="off"
          registerOptions={passwordOptions}
          type={showPassword ? 'text' : 'password'}
          endIcon={<PasswordEye showPassword={showPassword} setShowPassword={setShowPassword} />}
          bgcolor="white"
          flex={1}
          control={control}
          name="password"
          placeholder="Password"
        />
        <RdInput<TRegisterForm>
          autoComplete="off"
          registerOptions={rePasswordOptions}
          type={showRePassword ? 'text' : 'password'}
          endIcon={<PasswordEye showPassword={showRePassword} setShowPassword={setShowRePassword} />}
          bgcolor="white"
          flex={1}
          control={control}
          name="repassword"
          placeholder="Re-type your password"
        />
        <RdButton
          disabled={loading}
          text="Register"
          type="submit"
          endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
        />
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
