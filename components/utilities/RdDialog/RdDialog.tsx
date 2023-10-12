import Dialog, { DialogProps } from '@mui/material/Dialog'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { RdTransition } from '../RdTransition/RdTransition'

type TRdDialogProps = DialogProps & {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const RdDialog = ({ open, setOpen, children, sx }: TRdDialogProps) => {
  return (
    <Dialog
      sx={{ ...sx }}
      open={open}
      scroll="body"
      TransitionComponent={RdTransition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      {open && children}
    </Dialog>
  )
}

export default RdDialog
