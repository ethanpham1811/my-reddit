import { LoginPortal, RdButton, RdDialog } from '@/components'
import { Events, eventEmitter } from '@/src/eventEmitter'
import { useEffect, useState } from 'react'

function LoginButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    eventEmitter.subscribe(Events.OPEN_LOGIN_MODAL, (value) => [setOpen(value)])
    return () => eventEmitter.unsubscribe(Events.OPEN_LOGIN_MODAL)
  }, [])

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
