import { RdButton, RdCard } from '@/components'
import { LogoutIcon } from '@/constants/icons'
import { CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'

function CardLogout({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient()

  function onClick() {
    setLoading(true)
    setTimeout(async () => {
      supabase.auth.signOut()
      setLoading(false)
      toast.success('Logout Successfully')
      setOpen(false)
    }, 2000) // only for demonstration purpose
  }

  return (
    <RdCard sx={{ px: 4, py: 3, width: { xs: '400px', sm: '250px' } }}>
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
