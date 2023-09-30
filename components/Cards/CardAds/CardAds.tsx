import { SecurityOutlinedIcon } from '@/constants/icons'
import { CardActions, CardHeader } from '@mui/material'
import { RdButton, RdCard } from '../..'

function CardAds() {
  return (
    <RdCard>
      <CardHeader
        sx={{ p: 0 }}
        avatar={<SecurityOutlinedIcon sx={{ ml: 0.5 }} color="orange" />}
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
        <RdButton text={'Try Now'} invertColor />
      </CardActions>
    </RdCard>
  )
}

export default CardAds
