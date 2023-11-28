import { BsFacebook, BsReddit } from '@/src/constants/icons'
import { Box, Divider, IconButton, Stack, Typography } from '@/src/mui'
import { client } from '@/src/services/apollo-client'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Provider } from '@supabase/supabase-js'
import { Jelly } from '@uiball/loaders'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { RdCard } from '..'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'

function LoginPortal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const supabase = useSupabaseClient()
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const [newUserEmail, setNewUserEmail] = useState<string | null>(null)

  /* Login with Github */
  const LoginWithProvider = async (provider: Provider) => {
    const { error } = await supabase!.auth.signInWithOAuth({ provider })
    error && toast.error(error.message)

    // reset cache upon login
    client.resetStore()
  }

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
        <Typography variant="body2" sx={{ color: 'hintText.main' }}>
          Or login via social links
        </Typography>

        {/* Login with FB & Github providers button icons */}
        <Stack direction="row" justifyContent="flex-start" spacing={1}>
          <IconButton disabled sx={{ p: 0.4, color: 'unset', ml: '-0.4rem !important' }} onClick={() => LoginWithProvider('facebook')}>
            <BsFacebook size={25} />
          </IconButton>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Jelly size={20} speed={0.7} color="#ff4500" />
            </Box>
          ) : (
            <IconButton
              sx={{ p: 0.4, color: 'unset' }}
              onClick={() => {
                setLoading(true)
                LoginWithProvider('github')
              }}
            >
              <BsReddit size={25} />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default LoginPortal
