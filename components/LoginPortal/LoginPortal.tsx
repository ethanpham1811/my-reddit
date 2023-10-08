import { BsReddit, FcGoogle } from '@/constants/icons'
import { Divider, IconButton, Stack, Typography } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { RdCard } from '..'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'

function LoginPortal() {
  const [isLoginForm, setIsLoginForm] = useState(true)

  return (
    <RdCard sx={{ p: 3 }}>
      {isLoginForm ? <LoginForm setIsLoginForm={setIsLoginForm} /> : <RegisterForm setIsLoginForm={setIsLoginForm} />}
      <Divider sx={{ my: 1 }} />
      <Stack justifyContent="center" spacing={1}>
        <Typography variant="body2" sx={{ color: 'hintText.main' }}>
          Or login via social links
        </Typography>
        <Stack direction="row" justifyContent="flex-start" spacing={1}>
          <IconButton sx={{ p: 0.4, color: 'unset', ml: '-0.4rem !important' }} onClick={() => signIn('google')}>
            <FcGoogle size={25} onClick={() => signIn('google')} />
          </IconButton>
          <IconButton sx={{ p: 0.4, color: 'unset' }} onClick={() => signIn('reddit')}>
            <BsReddit size={25} />
          </IconButton>
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default LoginPortal
