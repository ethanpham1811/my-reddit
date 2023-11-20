import Drawer, { DrawerProps } from '@mui/material/Drawer'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

type TRdDrawerProps = DrawerProps & {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}
function RdDrawer({ open, setOpen, children, ...rest }: TRdDrawerProps) {
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return
    }
    setOpen(open)
  }

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)} {...rest}>
        {children}
      </Drawer>
    </div>
  )
}

export default RdDrawer
