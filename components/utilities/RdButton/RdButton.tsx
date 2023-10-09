import { DEFAULT_BUTTON_COLOR } from '@/constants/enums'
import { TRdButtonProps } from '@/constants/types'
import { notoSans } from '@/mui/theme'
import { Button } from '@mui/material'

function RdButton({ text, filled = false, flex, color = DEFAULT_BUTTON_COLOR, invertColor = false, sx, width, ...rest }: TRdButtonProps) {
  const hoverStyle = {
    '&:hover, &:focus': invertColor
      ? {
          color: filled ? color + '.main' : 'white.main',
          bgcolor: filled ? 'white.main' : color + '.main',
          borderColor: color + '.main'
        }
      : {
          color: filled ? 'white.main' : color + '.main',
          bgcolor: filled ? color + '.main' : 'white.main',
          borderColor: color + '.main',
          opacity: 0.9
        }
  }

  return (
    <Button
      size="medium"
      fullWidth
      variant="outlined"
      sx={{
        flex,
        color: filled ? 'white.main' : color + '.main',
        bgcolor: filled ? color + '.main' : 'white.main',
        borderColor: color + '.main',
        fontWeight: 700,
        fontFamily: notoSans.style.fontFamily,
        borderRadius: '9999px',
        textTransform: 'none',
        transitionDuration: '0.2s',
        width,
        '.MuiButton-endIcon': {
          position: 'absolute',
          right: '15px'
        },
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
