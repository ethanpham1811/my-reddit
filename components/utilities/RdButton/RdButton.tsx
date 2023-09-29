import { ButtonColor } from '@/constants/types'
import { notoSans } from '@/mui/theme'
import { Button } from '@mui/material'

type RdButtonProps = {
  text: string
  bgcolor?: ButtonColor
  color?: ButtonColor
  invertColor?: boolean
}

function RdButton({ text, bgcolor, color, invertColor }: RdButtonProps) {
  const hoverStyle = invertColor
    ? {
        '&:hover, &:focus': {
          bgcolor: 'white',
          color: bgcolor ? bgcolor + '.main' : 'orange.main',
          borderColor: 'auto'
        }
      }
    : {}
  return (
    <Button
      size="medium"
      fullWidth
      variant="outlined"
      sx={{
        bgcolor: bgcolor ? bgcolor + '.main' : 'orange.main',
        color: color ? color + '.main' : 'white.main',
        borderColor: color ? color + '.main' : 'white.main',
        fontWeight: 700,
        fontFamily: notoSans.style.fontFamily,
        borderRadius: '9999px',
        textTransform: 'none',
        transitionDuration: '0.2s',
        ...hoverStyle
      }}
    >
      {text}
    </Button>
  )
}

export default RdButton
