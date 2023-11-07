import { CardUserGuide, RdDialog, RdNotiBubble } from '@/components'
import { ColorModeContext } from '@/components/Layouts/MuiProvider'
import { TIconBox } from '@/constants/types'
import { Box, IconButton, Stack, Tooltip } from '@/mui'
import { Events, eventEmitter } from '@/src/eventEmitter'
import { notificationsLabel } from '@/src/utils'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { Fragment, createElement, useContext, useEffect, useState } from 'react'
import { buildData } from '../data'

function IconBox({ isMobile }: { isMobile: boolean }) {
  const { push: navigate } = useRouter()
  const { toggleColorMode } = useContext(ColorModeContext)
  const [userGuideOpen, setUserGuideOpen] = useState(false)
  const firstTime = !cookie.get('first-time-visit-my-reddit')
  const notiData: TIconBox[] = buildData({ toggleColorMode, openPremiumDrawer, setUserGuideOpen, navigate })

  /* open the user guide for the first time using the app */
  useEffect(() => {
    if (firstTime) {
      setUserGuideOpen(true)
      cookie.set('first-time-visit-my-reddit', 'true')
    }
  }, [firstTime])

  function openPremiumDrawer() {
    eventEmitter.dispatch(Events.OPEN_PREMIUM_DRAWER, true)
  }

  return (
    <>
      <Stack direction="row">
        {notiData.length > 0 &&
          notiData.map(({ name, disabled, tooltip, notification, icon, hideOnMobile, onClick }) => (
            <Fragment key={`noti_bubble_${name}`}>
              {isMobile && hideOnMobile ? null : (
                <Tooltip title={tooltip}>
                  <Box>
                    <IconButton
                      onClick={onClick}
                      size="large"
                      sx={{ color: 'icon.main', p: 1.25, fontSize: '2rem', '&.Mui-disabled': { color: 'hintText.main' } }}
                      aria-label={notificationsLabel(100)}
                      disabled={disabled}
                    >
                      {notification ? (
                        <RdNotiBubble badgeContent={notification.content} max={notification.max}>
                          {createElement(icon)}
                        </RdNotiBubble>
                      ) : (
                        createElement(icon)
                      )}
                    </IconButton>
                  </Box>
                </Tooltip>
              )}
            </Fragment>
          ))}
      </Stack>

      {/* Function list dialog */}
      <RdDialog open={userGuideOpen} onClose={() => setUserGuideOpen(false)}>
        <CardUserGuide setOpen={setUserGuideOpen} />
      </RdDialog>
    </>
  )
}

export default IconBox
