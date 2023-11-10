import { RdButton, RdInput } from '@/components'
import { CircularProgress, Link, Stack, Typography } from '@/mui'
import { emailValidation } from '@/src/formValidations'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordEye from '../PasswordEye'

type TLoginFormProps = {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>
  setOpen: Dispatch<SetStateAction<boolean>>
  newUserEmail: string | null
}
type TLoginForm = {
  email: string
  password: string
}
function LoginForm({ setIsLoginForm, setOpen, newUserEmail }: TLoginFormProps) {
  const supabase = useSupabaseClient()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* form controllers */
  const { handleSubmit, control, setValue } = useForm<TLoginForm>()

  /* set email by registered email or offer test account for demonstration */
  useEffect(() => {
    setValue('email', newUserEmail || 'guest_account@gmail.com')
    !newUserEmail && setValue('password', '123123')
  }, [newUserEmail, setValue])

  /* form submit: signin with email + password */
  const onSubmit = handleSubmit(async (formData) => {
    if (!supabase) return
    setLoading(true)
    const { email, password } = formData
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    error
      ? setError(error.message) // Display an error message
      : setOpen(false)
    setLoading(false)
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ width: { xs: '60vw', sm: '250px' } }}>
        {/* Inform messages */}
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
              {error}
            </Typography>
          </Stack>
        )}

        {/* Email + Pasword inputs */}
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

        {/* Login button */}
        <RdButton
          disabled={loading}
          text={loading ? 'Signing in..' : 'Login'}
          type="submit"
          endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
        />

        {/* Not registered? Signup here */}
        <Typography variant="subtitle1" fontSize="0.8rem" sx={{ color: 'hintText.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          Not Registered?{' '}
          <Link component="button" sx={{ cursor: 'pointer', color: 'blue.main' }} onClick={() => setIsLoginForm(false)}>
            Signup
          </Link>
        </Typography>
      </Stack>
    </form>
  )
}

export default LoginForm
