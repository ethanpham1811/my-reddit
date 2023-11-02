import { SecurityOutlinedIcon } from '@/constants/icons'
import { CardActions, CardHeader } from '@mui/material'
import { useState } from 'react'
import { RdButton, RdCard } from '../..'

function CardAds() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)

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
        <RdButton onClick={() => setIsOpenDialog(true)} filled text={'Try Now'} invertColor />
      </CardActions>
      {/* <RdDialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <CardPayment />
      </RdDialog> */}
    </RdCard>
  )
}

export default CardAds
