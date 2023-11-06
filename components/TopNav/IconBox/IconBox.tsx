import { CardUserGuide, RdDialog, RdNotiBubble } from '@/components'
import { ColorModeContext } from '@/components/Layouts/MuiLayout'
import { NOTI_BOX_NAME } from '@/constants/enums'
import { Box, IconButton, Stack, Tooltip } from '@/mui'
import { notificationsLabel } from '@/src/utils'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { Fragment, createElement, useContext, useEffect, useState } from 'react'
import { notiData } from '../data'

function IconBox({ isMobile }: { isMobile: boolean }) {
  const { push: navigate } = useRouter()
  const { toggleColorMode } = useContext(ColorModeContext)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const firstTime = !cookie.get('first-time-visit-my-reddit')

  /* open the user guide for the first time using the app */
  useEffect(() => {
    if (firstTime) {
      setIsOpenDialog(true)
      cookie.set('first-time-visit-my-reddit', 'true')
    }
  }, [firstTime])

  function onClick(name: string, url?: string) {
    if (name === NOTI_BOX_NAME.Darkmode) {
      toggleColorMode()
    }
    if (name === NOTI_BOX_NAME.Guide) {
      setIsOpenDialog(true)
    }

    url && navigate(url)
  }

  return (
    <>
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
      <RdDialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <CardUserGuide setOpen={setIsOpenDialog} />
      </RdDialog>
    </>
  )
}

export default IconBox
