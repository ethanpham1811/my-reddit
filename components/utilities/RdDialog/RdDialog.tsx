import Dialog, { DialogProps } from '@mui/material/Dialog'
import { ReactNode } from 'react'
import { RdTransition } from '../RdTransition/RdTransition'

type TRdDialogProps = DialogProps & {
  open: boolean
  children: ReactNode
  transparent?: boolean
}

const RdDialog = ({ open, children, transparent, ...rest }: TRdDialogProps) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={RdTransition}
      keepMounted
      disableScrollLock
      PaperProps={{
        sx: transparent ? { boxShadow: 'none', bgcolor: 'transparent' } : {}
      }}
      aria-describedby="alert-dialog-slide-description"
      {...rest}
    >
      {open && children}
    </Dialog>
  )
}

export default RdDialog
