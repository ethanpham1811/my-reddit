import { RdNotiBubble } from '@/components'
import { notificationsLabel } from '@/components/utilities'
import { AddSharpIcon, CampaignOutlinedIcon, NotificationsOutlinedIcon, OutboundOutlinedIcon, SmsOutlinedIcon } from '@/constants/icons'
import { IconButton, Stack } from '@mui/material'
import { ReactNode } from 'react'

type TNotiData = {
  content: number
  max: number
}
type TIconBox = {
  icon: ReactNode
  name: string
  notification?: TNotiData
}

const notiData: TIconBox[] = [
  {
    icon: <OutboundOutlinedIcon />,
    name: 'Popular'
  },
  {
    icon: <SmsOutlinedIcon />,
    name: 'Chat',
    notification: {
      content: 12,
      max: 99
    }
  },
  {
    icon: <NotificationsOutlinedIcon />,
    name: 'Notification',
    notification: {
      content: 999,
      max: 99
    }
  },
  {
    icon: <AddSharpIcon />,
    name: 'Create'
  },
  {
    icon: <CampaignOutlinedIcon />,
    name: 'Advertise'
  }
]

function IconBox() {
  return (
    <Stack direction="row">
      {notiData.length > 0 &&
        notiData.map((item) => (
          <IconButton
            key={`noti_bubble_${item.name}`}
            size="large"
            sx={{ color: 'icon.main', p: 1.25, fontSize: '2rem' }}
            aria-label={notificationsLabel(100)}
          >
            {item.notification ? (
              <RdNotiBubble content={item.notification.content} max={item.notification.max}>
                {item.icon}
              </RdNotiBubble>
            ) : (
              item.icon
            )}
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
    </Stack>
  )
}

export default IconBox
