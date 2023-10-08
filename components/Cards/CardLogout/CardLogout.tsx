import { RdButton, RdCard } from '@/components'
import { LogoutIcon } from '@/constants/icons'
import { Divider, Stack, Typography } from '@mui/material'
import { signOut } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'

function CardLogout({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <RdCard sx={{ px: 4, py: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={2} alignItems="center">
          <Typography>Leaving so soon?</Typography>
          <LogoutIcon sx={{ fontSize: '2rem' }} />
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <RdButton text="Cancel" filled color="blue" onClick={() => setOpen(false)} />
          <RdButton text="Logout" invertColor onClick={() => signOut()} />
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default CardLogout
