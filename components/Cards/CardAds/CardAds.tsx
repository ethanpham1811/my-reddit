import { SecurityOutlinedIcon } from '@/constants/icons'
import { CardActions, CardHeader, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { RdButton, RdCard, RdDrawer } from '../..'
import CardPayment from '../CardPayment/CardPayment'

function CardAds() {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

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
        <RdButton onClick={() => setIsOpenDrawer(true)} filled text={'Try Now'} invertColor />
      </CardActions>

      {/* Left drawer (Premium registration form) */}
      <RdDrawer disableScrollLock={!isMobile} anchor="left" open={isOpenDrawer} setOpen={setIsOpenDrawer}>
        <CardPayment />
      </RdDrawer>
    </RdCard>
  )
}

export default CardAds
