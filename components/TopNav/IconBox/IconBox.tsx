import { RdNotiBubble } from '@/components'
import { ColorModeContext } from '@/components/Layouts/MuiLayout'
import { notificationsLabel } from '@/src/utils'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useContext } from 'react'
import { notiData } from '../data'

function IconBox({ isMobile }: { isMobile: boolean }) {
  const { push: navigate } = useRouter()
  const { toggleColorMode } = useContext(ColorModeContext)

  function onClick(name: string, url?: string) {
    if (name === 'Darkmode') {
      toggleColorMode()
    } else {
      url && navigate(url)
    }
  }
  return (
    <Stack direction="row">
      {notiData.length > 0 &&
        notiData.map(({ name, active, tooltip, notification, url, icon, hideOnMobile }) => (
          <Fragment key={`noti_bubble_${name}`}>
            {isMobile && hideOnMobile ? null : (
              <Tooltip title={tooltip}>
                <Box>
                  <IconButton
                    onClick={() => onClick(name, url)}
                    size="large"
                    sx={{ color: 'icon.main', p: 1.25, fontSize: '2rem', '&.Mui-disabled': { color: 'hintText.main' } }}
                    aria-label={notificationsLabel(100)}
                    disabled={!active}
                  >
                    {notification ? (
                      <RdNotiBubble content={notification.content} max={notification.max}>
                        {icon}
                      </RdNotiBubble>
                    ) : (
                      icon
                    )}
                  </IconButton>
                </Box>
              </Tooltip>
            )}
          </Fragment>
        ))}
    </Stack>
  )
}

export default IconBox
