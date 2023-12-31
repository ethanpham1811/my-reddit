import { useAppSession } from '@/src/Layouts/MainLayout'
import { DarkModeContext } from '@/src/Layouts/MuiProvider'
import { CardUserGuide, RdDialog, RdNotiBubble } from '@/src/components'
import RdTooltip from '@/src/components/utilities/RdTooltip/RdTooltip'
import { TIconBox } from '@/src/constants/types'
import { Box, IconButton, Stack } from '@/src/mui'
import { Events, eventEmitter } from '@/src/services/eventEmitter'
import { notificationsLabel } from '@/src/services/utils'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { Fragment, createElement, useContext, useEffect, useState } from 'react'
import { buildData } from '../data'

function IconBox({ isMobile }: { isMobile: boolean }) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { push: navigate } = useRouter()
  const { toggleDarkMode, mode } = useContext(DarkModeContext)
  const [userGuideOpen, setUserGuideOpen] = useState(false)
  const firstTime = !cookie.get('first-time-visit-my-reddit')
  const notiData: TIconBox[] = buildData({ me, mode, toggleDarkMode, openPremiumDrawer, setUserGuideOpen, navigate })

  /*
   * upon user first time visit the app
   * show user guide & set cookie firstime=false
   */
  useEffect(() => {
    if (!firstTime) return
    setUserGuideOpen(true)
    cookie.set('first-time-visit-my-reddit', 'false')
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
                <RdTooltip title={tooltip}>
                  <Box>
                    <IconButton
                      onClick={onClick}
                      size="large"
                      sx={{ color: 'secondary.dark', p: 1.25, fontSize: '2rem', '&.Mui-disabled': { color: 'gray.dark' } }}
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
                </RdTooltip>
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
