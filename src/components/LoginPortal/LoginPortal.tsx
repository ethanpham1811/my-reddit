import { BsFacebook, BsGithub } from '@/src/constants/icons'
import { Divider, Stack, Typography } from '@/src/mui'
import { Dispatch, SetStateAction, useState } from 'react'
import { RdCard } from '..'
import LoginForm from './components/LoginForm'
import ProviderLoginBtn from './components/ProviderLoginBtn'
import RegisterForm from './components/RegisterForm'

function LoginPortal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [newUserEmail, setNewUserEmail] = useState<string | null>(null)

  return (
    <RdCard sx={{ p: 3 }}>
      {/* Login + Register forms */}
      {isLoginForm ? (
        <LoginForm setOpen={setOpen} setIsLoginForm={setIsLoginForm} newUserEmail={newUserEmail} />
      ) : (
        <RegisterForm setNewUserEmail={setNewUserEmail} setIsLoginForm={setIsLoginForm} />
      )}

      <Divider sx={{ my: 1 }} />
      <Stack justifyContent="center" spacing={1}>
        <Typography variant="body2" sx={{ color: 'gray.dark' }}>
          Or login via social links
        </Typography>

        {/* providers login buttons */}
        <Stack direction="row" justifyContent="flex-start" spacing={1}>
          <ProviderLoginBtn icon={<BsFacebook size={25} />} name="facebook" disabled sx={{ ml: '-0.2rem !important' }} />
          <ProviderLoginBtn icon={<BsGithub size={25} />} name="github" />
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default LoginPortal
