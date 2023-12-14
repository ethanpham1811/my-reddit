import { Box, IconButton } from '@/src/mui'
import { client } from '@/src/services/apollo-client'
import { IconButtonProps } from '@mui/material/IconButton'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Provider } from '@supabase/supabase-js'
import { Jelly } from '@uiball/loaders'
import { ReactNode, useState } from 'react'
import toast from 'react-hot-toast'

type TProviderLoginBtnProps = IconButtonProps & {
  icon: ReactNode
  name: Provider
  disabled?: boolean
}

/**
 * @param  {Provider} name // provider name "github", "facebook" ...
 */
function ProviderLoginBtn({ icon, name, disabled, sx, ...rest }: TProviderLoginBtnProps) {
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)

  const LoginWithProvider = async (provider: Provider) => {
    const { error } = await supabase!.auth.signInWithOAuth({ provider })
    error && toast.error(error.message)

    client.resetStore() // reset apollo cache upon login
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Jelly size={20} speed={0.7} color="#ff4500" />
      </Box>
    )
  }

  return (
    <IconButton
      disabled={disabled}
      sx={{ p: 0.4, color: 'unset', ...sx }}
      onClick={() => {
        setLoading(true)
        LoginWithProvider(name)
      }}
      aria-label={`${name} login`}
      {...rest}
    >
      {icon}
    </IconButton>
  )
}

export default ProviderLoginBtn
