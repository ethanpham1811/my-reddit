import { useAppSession } from '@/src/Layouts/MainLayout'
import { SecurityOutlinedIcon } from '@/src/constants/icons'
import { CardActions, CardHeader, useMediaQuery, useTheme } from '@/src/mui'
import { Events, eventEmitter } from '@/src/services/eventEmitter'
import { useState } from 'react'
import { RdButton, RdCard } from '../..'

function CardAds() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { breakpoints } = useTheme()
  const isMobileXl = useMediaQuery(breakpoints.down('xl'))
  const [showLoginBtn, setShowLoginBtn] = useState(false)

  /* fire event to open login modal */
  function onClickLogin() {
    eventEmitter.dispatch(Events.OPEN_LOGIN_MODAL, true)
  }

  /* fire event to open premium drawer */
  function onClickTryNow() {
    eventEmitter.dispatch(Events.OPEN_PREMIUM_DRAWER, true)
  }

  return (
    <RdCard
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'center', md: 'unset' },
        justifyContent: { xs: 'unset', sm: 'center', md: 'unset' }
      }}
    >
      <CardHeader
        sx={{
          p: 0,
          gap: { xs: 1, sm: 0, md: 1 },
          flexDirection: { xs: 'row', sm: 'column', md: 'row' },
          '.MuiCardHeader-avatar': { m: 0 },
          '.MuiCardHeader-content': { textAlign: { xs: 'left', sm: 'center', md: 'left' } }
        }}
        avatar={<SecurityOutlinedIcon sx={{ ml: 0.5, color: 'orange.main' }} />}
        titleTypographyProps={{
          sx: {
            fontSize: '0.8rem'
          }
        }}
        subheaderTypographyProps={{
          sx: {
            fontSize: '0.8rem'
          }
        }}
        title="Reddit Premium"
        subheader="The best Reddit experience"
      />
      <CardActions sx={{ p: 0, pt: 0.5, width: { xs: '100%', sm: 'auto', md: '100%' } }}>
        {me ? (
          <RdButton onClick={onClickTryNow} filled text={'Try Now'} invertColor />
        ) : (
          <RdButton
            onClick={onClickLogin}
            filled={isMobileXl ? true : showLoginBtn}
            text={showLoginBtn ? 'Login' : isMobileXl ? 'Login' : 'Try Now'}
            onMouseEnter={() => setShowLoginBtn(true)}
            onMouseLeave={() => setShowLoginBtn(false)}
          />
        )}
      </CardActions>
    </RdCard>
  )
}

export default CardAds
