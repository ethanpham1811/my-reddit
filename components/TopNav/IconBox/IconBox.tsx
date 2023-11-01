import { RdNotiBubble } from '@/components'
import { notificationsLabel } from '@/src/utils'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Fragment } from 'react'
import { notiData } from '../data'

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
