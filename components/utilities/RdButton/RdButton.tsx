import { TButtonColor } from '@/constants/types'
import { notoSans } from '@/mui/theme'
import { Button, SxProps, Theme } from '@mui/material'

type TRdButtonProps = {
  text: string
  bgcolor?: TButtonColor
  color?: TButtonColor
  invertColor?: boolean
  sx?: SxProps<Theme>
  flex?: number
  width?: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

function RdButton({ text, bgcolor, flex, color, invertColor, sx, width, type }: TRdButtonProps) {
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
      type={type ?? 'button'}
      sx={{
        flex,
        bgcolor: bgcolor ? bgcolor + '.main' : 'orange.main',
        color: color ? color + '.main' : 'white.main',
        borderColor: color ? color + '.main' : 'white.main',
        fontWeight: 700,
        fontFamily: notoSans.style.fontFamily,
        borderRadius: '9999px',
        textTransform: 'none',
        transitionDuration: '0.2s',
        width,
        ...hoverStyle,
        ...sx
      }}
    >
      {text}
    </Button>
  )
}

export default RdButton
