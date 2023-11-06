import { RdButton, RdInput } from '@/components'
import { CircularProgress, Link, Stack, Typography } from '@/mui'
import { emailValidation, passwordValidation, rePasswordValidation } from '@/src/formValidations'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordEye from '../PasswordEye'

type TRegisterFormProps = {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>
  setNewUserEmail: Dispatch<SetStateAction<string | null>>
}
type TRegisterForm = {
  email: string
  password: string
  repassword: string
}
function RegisterForm({ setIsLoginForm, setNewUserEmail }: TRegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  /* form controllers */
  const { handleSubmit, getValues, control } = useForm<TRegisterForm>()

  /* form submit: Register with email + password */
  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true)
    const { email, password, repassword } = formData
    if (password !== repassword) return

    const res = await fetch(`/api/auth/register`, {
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
      : (setNewUserEmail(email), setIsLoginForm(true))
    setLoading(false)
  })

  /* register options */
  const passwordOptions = {
    validate: (val: string) => passwordValidation(val)
  }
  const rePasswordOptions = {
    validate: (val: string) => rePasswordValidation(val, getValues('password'))
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ width: { xs: '60vw', sm: '300px' } }}>
        {/* Error message */}
        {error && (
          <Stack alignItems="center">
            <Typography fontSize="0.8rem" sx={{ color: 'orange.main' }}>
              {error}
            </Typography>
          </Stack>
        )}

        {/* Form Email / Password / Repassword inputs */}
        <RdInput<TRegisterForm>
          autoComplete="off"
          registerOptions={{ validate: (val): string | boolean => emailValidation(val) }}
          bgcolor="white"
          flex={1}
          control={control}
          name="email"
          placeholder="Email"
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

        {/* Register button */}
        <RdButton
          disabled={loading}
          text={loading ? 'Registering..' : 'Register'}
          type="submit"
          endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
        />

        {/* Back to Login */}
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
