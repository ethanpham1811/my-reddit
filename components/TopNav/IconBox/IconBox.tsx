import { notificationsLabel } from '@/components/utilities'
import { AddSharpIcon, CampaignOutlinedIcon, NotificationsOutlinedIcon, OutboundOutlinedIcon, SmsOutlinedIcon } from '@/constants'
import { Color } from '@/constants/types'
import { Badge, Box, IconButton, styled } from '@mui/material'
import { ReactNode } from 'react'
import { v4 as rid } from 'uuid'

type NotiData = {
  content: number
  color: Color | undefined
  max: number
  icon: ReactNode
}

const notiData: NotiData[] = [
  {
    content: 17,
    color: 'error',
    max: 99,
    icon: <OutboundOutlinedIcon />
  },
  {
    content: 0,
    color: 'error',
    max: 99,
    icon: <SmsOutlinedIcon />
  },
  {
    content: 1,
    color: 'error',
    max: 99,
    icon: <NotificationsOutlinedIcon />
  },
  {
    content: 5666,
    color: 'error',
    max: 99,
    icon: <AddSharpIcon />
  },
  {
    content: 6,
    color: 'error',
    max: 99,
    icon: <CampaignOutlinedIcon />
  }
]

function IconBox() {
  const RdNotiBubble = styled(Badge)(() => {
    return {
      '.MuiBadge-badge': { fontSize: '0.5rem', padding: '0 2px', height: '16px', lineHeight: 1, minWidth: '16px' }
    }
  })

  return (
    <Box flex={1}>
      {notiData.length > 0 &&
        notiData.map((item) => (
          <IconButton
            key={`noti_bubble_${rid()}`}
            size="large"
            sx={{ color: (theme): string => theme.palette.icon.main, padding: '10px', fontSize: '2rem' }}
            aria-label={notificationsLabel(100)}
          >
            <RdNotiBubble badgeContent={item.content} color={item.color} max={item.max}>
              {item.icon}
            </RdNotiBubble>
          </IconButton>
        ))}

      {/* <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        // aria-controls={menuId}
        aria-haspopup="true"
        // onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton> */}
    </Box>
  )
}

export default IconBox
