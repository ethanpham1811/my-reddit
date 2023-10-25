import { LoginPortal, RdButton, RdDialog } from '@/components'
import { useState } from 'react'

function LoginButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <RdButton sx={{ py: '6px' }} onClick={() => setOpen(true)} text="Log In" filled invertColor />
      <RdDialog open={open} onClose={() => setOpen(false)}>
        <LoginPortal setOpen={setOpen} />
      </RdDialog>
    </>
  )
}

export default LoginButton
