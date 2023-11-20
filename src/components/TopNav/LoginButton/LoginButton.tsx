import { LoginPortal, RdButton, RdDialog } from '@/src/components'
import { Events, eventEmitter } from '@/src/services/eventEmitter'
import { useEffect, useState } from 'react'

function LoginButton() {
  const [open, setOpen] = useState(false)

  /* fire event to open login modal  */
  useEffect(() => {
    eventEmitter.subscribe(Events.OPEN_LOGIN_MODAL, (value: unknown) => typeof value === 'boolean' && setOpen(value))
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
