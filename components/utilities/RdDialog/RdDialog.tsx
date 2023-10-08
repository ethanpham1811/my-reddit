import Dialog, { DialogProps } from '@mui/material/Dialog'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { RdTransition } from '../RdTransition/RdTransition'

type TRdDialogProps = DialogProps & {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const RdDialog = ({ open, setOpen, children }: TRdDialogProps) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={RdTransition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      {children}
    </Dialog>
  )
}

export default RdDialog
