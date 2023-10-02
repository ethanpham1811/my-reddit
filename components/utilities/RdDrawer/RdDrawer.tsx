import { TRdDrawerProps } from '@/constants/types'
import Drawer from '@mui/material/Drawer'
import React from 'react'

function RdDrawer({ open, setOpen, children }: TRdDrawerProps) {
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return
    }
    setOpen(open)
  }

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {children}
      </Drawer>
    </div>
  )
}

export default RdDrawer
