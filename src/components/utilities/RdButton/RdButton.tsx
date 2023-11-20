import { DEFAULT_BUTTON_COLOR } from '@/src/constants/enums'
import { TButtonColor } from '@/src/constants/types'
import { notoSans } from '@/src/mui/theme'
import Button, { ButtonOwnProps, ButtonProps } from '@mui/material/Button'
import { SxProps, Theme } from '@mui/material/styles'

type TRdButtonProps = ButtonOwnProps &
  Pick<ButtonProps, 'type' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'> & {
    text: string
    filled?: boolean
    color?: TButtonColor
    invertColor?: boolean
    sx?: SxProps<Theme>
    flex?: number
    width?: string
    minWidth?: string
  }
function RdButton({ text, filled = false, flex, color = DEFAULT_BUTTON_COLOR, invertColor = false, sx, width, minWidth, ...rest }: TRdButtonProps) {
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
        transition: 'none',
        minWidth,
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
