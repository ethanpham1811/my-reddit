import { SxProps, Theme } from '@mui/material'
import { noLayout } from './button'

const borderColorStyle: SxProps<Theme> = {
  // fieldset: {},
  '.Mui-focused, &:hover': {
    fieldset: {
      borderWidth: '1px !important',
      borderColor: (theme) => theme.palette.hoverState.main + '!important'
    }
  }
}

export { borderColorStyle, noLayout }
