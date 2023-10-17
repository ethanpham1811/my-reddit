import { BsFacebook, BsReddit } from '@/constants/icons'
import { Divider, IconButton, Stack, Typography } from '@mui/material'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Provider } from '@supabase/supabase-js'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { RdCard } from '..'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'

function LoginPortal() {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [newUserEmail, setNewUserEmail] = useState<string | null>(null)
  const supabase = useSupabaseClient()

  const LoginWithProvider = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    error && toast.error(error.message)
  }

  return (
    <RdCard sx={{ p: 3 }}>
      {isLoginForm ? (
        <LoginForm setIsLoginForm={setIsLoginForm} newUserEmail={newUserEmail} />
      ) : (
        <RegisterForm setNewUserEmail={setNewUserEmail} setIsLoginForm={setIsLoginForm} />
      )}
      <Divider sx={{ my: 1 }} />
      <Stack justifyContent="center" spacing={1}>
        <Typography variant="body2" sx={{ color: 'hintText.main' }}>
          Or login via social links
        </Typography>
        <Stack direction="row" justifyContent="flex-start" spacing={1}>
          <IconButton disabled sx={{ p: 0.4, color: 'unset', ml: '-0.4rem !important' }} onClick={() => LoginWithProvider('facebook')}>
            <BsFacebook size={25} />
          </IconButton>
          <IconButton sx={{ p: 0.4, color: 'unset' }} onClick={() => LoginWithProvider('github')}>
            <BsReddit size={25} />
          </IconButton>
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default LoginPortal
