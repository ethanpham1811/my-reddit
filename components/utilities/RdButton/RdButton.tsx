import { TRdButtonProps } from '@/constants/types'
import { notoSans } from '@/mui/theme'
import { Button } from '@mui/material'

function RdButton({ text, bgcolor, flex, color, invertColor, sx, width, ...rest }: TRdButtonProps) {
  const hoverStyle = {
    '&:hover, &:focus': invertColor
      ? {
          bgcolor: 'white',
          color: bgcolor ? bgcolor + '.main' : 'orange.main',
          borderColor: bgcolor ? bgcolor + '.main' : 'orange.main'
        }
      : {
          opacity: 0.9,
          bgcolor: bgcolor ? bgcolor + '.main' : 'orange.main',
          color: 'white',
          borderColor: bgcolor ? bgcolor + '.main' : 'orange.main'
        }
  }

  return (
    <Button
      size="medium"
      fullWidth
      variant="outlined"
      sx={{
        flex,
        bgcolor: bgcolor ? bgcolor + '.main' : 'orange.main',
        color: color ? color + '.main' : 'white.main',
        borderColor: bgcolor ? bgcolor + '.main' : 'orange.main',
        fontWeight: 700,
        fontFamily: notoSans.style.fontFamily,
        borderRadius: '9999px',
        textTransform: 'none',
        transitionDuration: '0.2s',
        width,
        ...hoverStyle,
        ...sx
      }}
      {...rest}
    >
      {text}
    </Button>
  )
}

export default RdButton
