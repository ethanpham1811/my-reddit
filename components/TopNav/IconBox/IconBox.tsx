import { RdNotiBubble } from '@/components'
import { AddSharpIcon, CampaignOutlinedIcon, NotificationsOutlinedIcon, OutboundOutlinedIcon, SmsOutlinedIcon } from '@/constants/icons'
import { TIconBox } from '@/constants/types'
import { notificationsLabel } from '@/services'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Fragment } from 'react'

const notiData: TIconBox[] = [
  {
    icon: <OutboundOutlinedIcon />,
    name: 'Popular',
    tooltip: 'Work in progress'
  },
  {
    icon: <SmsOutlinedIcon />,
    name: 'Chat',
    notification: {
      content: 12,
      max: 99
    },
    hideOnMobile: true,
    tooltip: 'Work in progress'
  },
  {
    icon: <NotificationsOutlinedIcon />,
    name: 'Notification',
    notification: {
      content: 999,
      max: 99
    },
    tooltip: 'Work in progress'
  },
  {
    icon: <AddSharpIcon />,
    name: 'Create',
    hideOnMobile: true,
    tooltip: 'Work in progress'
  },
  {
    icon: <CampaignOutlinedIcon />,
    name: 'Advertise',
    hideOnMobile: true,
    tooltip: 'Work in progress'
  }
]

function IconBox({ isMobile }: { isMobile: boolean }) {
  return (
    <Stack direction="row">
      {notiData.length > 0 &&
        notiData.map(({ name, tooltip, notification, icon, hideOnMobile }) => (
          <Fragment key={`noti_bubble_${name}`}>
            {isMobile && hideOnMobile ? null : (
              <Tooltip title={tooltip}>
                <IconButton size="large" sx={{ color: 'icon.main', p: 1.25, fontSize: '2rem' }} aria-label={notificationsLabel(100)}>
                  {notification ? (
                    <RdNotiBubble content={notification.content} max={notification.max}>
                      {icon}
                    </RdNotiBubble>
                  ) : (
                    icon
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Fragment>
        ))}
    </Stack>
  )
}

export default IconBox
