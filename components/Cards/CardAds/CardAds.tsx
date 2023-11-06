import { useAppSession } from '@/components/Layouts/MainLayout'
import { SecurityOutlinedIcon } from '@/constants/icons'
import { CardActions, CardHeader, useMediaQuery, useTheme } from '@/mui'
import { Events, eventEmitter } from '@/src/eventEmitter'
import { useState } from 'react'
import { RdButton, RdCard, RdDrawer } from '../..'
import CardPayment from '../CardPayment/CardPayment'

function CardAds() {
  const { session } = useAppSession()
  const me = session?.userDetail
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const isMobileXl = useMediaQuery(breakpoints.down('xl'))
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [showLoginBtn, setShowLoginBtn] = useState(false)

  /* fire event to open login modal */
  function onClick() {
    eventEmitter.dispatch(Events.OPEN_LOGIN_MODAL, true)
  }

  return (
    <RdCard>
      <CardHeader
        sx={{ p: 0 }}
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
      <CardActions sx={{ p: 0, pt: 0.5 }}>
        {me ? (
          <RdButton onClick={() => setIsOpenDrawer(true)} filled text={'Try Now'} invertColor />
        ) : (
          <RdButton
            onClick={onClick}
            filled={isMobileXl ? true : showLoginBtn}
            text={showLoginBtn ? 'Login' : isMobileXl ? 'Login' : 'Try Now'}
            onMouseEnter={() => setShowLoginBtn(true)}
            onMouseLeave={() => setShowLoginBtn(false)}
          />
        )}
      </CardActions>

      {/* Left drawer (Premium registration form) */}
      <RdDrawer disableScrollLock={!isMobile} anchor="left" open={isOpenDrawer} setOpen={setIsOpenDrawer}>
        <CardPayment setOpen={setIsOpenDrawer} />
      </RdDrawer>
    </RdCard>
  )
}

export default CardAds
