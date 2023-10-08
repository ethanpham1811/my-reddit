import { LoginPortal, RdButton, RdDialog } from '@/components'
import { useState } from 'react'

function LoginButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <RdButton onClick={() => setOpen(true)} text="Log In" filled invertColor />
      <RdDialog open={open} setOpen={setOpen}>
        <LoginPortal />
      </RdDialog>
    </>
  )
}

export default LoginButton
