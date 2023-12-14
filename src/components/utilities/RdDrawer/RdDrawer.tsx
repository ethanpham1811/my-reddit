import { useMediaQuery, useTheme } from '@/src/mui'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

type TRdDrawerProps = DrawerProps & {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

function RdDrawer({ open, setOpen, children, ...rest }: TRdDrawerProps) {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return
    }
    setOpen(open)
  }

  return (
    <div>
      <Drawer disableScrollLock={!isMobile} open={open} onClose={toggleDrawer(false)} {...rest}>
        {children}
      </Drawer>
    </div>
  )
}

export default RdDrawer
