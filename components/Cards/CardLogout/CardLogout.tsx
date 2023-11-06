import { client } from '@/apollo-client'
import { RdButton, RdCard } from '@/components'
import { LogoutIcon } from '@/constants/icons'
import { CircularProgress, Divider, Stack, Typography } from '@/mui'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Dispatch, SetStateAction, useState } from 'react'

function CardLogout({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)

  function onClick() {
    setLoading(true)
    supabase?.auth.signOut().then(() =>
      // reset cache upon signout
      client.resetStore()
    )

    // with a delay only for loading demonstrating purpose
    setTimeout(async () => {
      setLoading(false)
      setOpen(false)
    }, 2500)
  }

  return (
    <RdCard sx={{ px: 4, py: 3, width: { xs: '60vw', sm: '250px' } }}>
      <Stack spacing={2}>
        <Stack spacing={2} alignItems="center">
          <Typography>Leaving so soon?</Typography>
          <LogoutIcon sx={{ fontSize: '2rem' }} />
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {!loading && <RdButton text="Cancel" filled color="blue" onClick={() => setOpen(false)} />}
          <RdButton
            disabled={loading}
            text={loading ? 'Logging out...' : 'Logout'}
            invertColor={!loading}
            onClick={onClick}
            endIcon={loading && <CircularProgress sx={{ color: 'orange.main' }} size={20} />}
          />
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default CardLogout
