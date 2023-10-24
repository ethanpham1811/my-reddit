import { RdNotiBubble } from '@/components'
import { AddSharpIcon, CampaignOutlinedIcon, NotificationsOutlinedIcon, OutboundOutlinedIcon, SmsOutlinedIcon } from '@/constants/icons'
import { TIconBox } from '@/constants/types'
import { notificationsLabel } from '@/services'
import { IconButton, Stack } from '@mui/material'
import { Fragment } from 'react'

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
    name: 'Create',
    hideOnMobile: true
  },
  {
    icon: <CampaignOutlinedIcon />,
    name: 'Advertise',
    hideOnMobile: true
  }
]

function IconBox({ isMobile }: { isMobile: boolean }) {
  return (
    <Stack direction="row">
      {notiData.length > 0 &&
        notiData.map(({ name, notification, icon, hideOnMobile }) => (
          <Fragment key={`noti_bubble_${name}`}>
            {isMobile && hideOnMobile ? null : (
              <IconButton size="large" sx={{ color: 'icon.main', p: 1.25, fontSize: '2rem' }} aria-label={notificationsLabel(100)}>
                {notification ? (
                  <RdNotiBubble content={notification.content} max={notification.max}>
                    {icon}
                  </RdNotiBubble>
                ) : (
                  icon
                )}
              </IconButton>
            )}
          </Fragment>
        ))}
    </Stack>
  )
}

export default IconBox
