import { TRdAutoCompleteProps } from '@/constants/types'
import { borderColorStyle } from '@/mui/styles'
import { Autocomplete } from '@mui/material'

function RdAutoComplete<
  OptionType,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipCom extends React.ElementType<any> = 'div'
>({ sx, isMobile = false, focused, ...rest }: TRdAutoCompleteProps<OptionType, Multiple, DisableClearable, FreeSolo, ChipCom>) {
  const mergeStyle = { ...sx, ...borderColorStyle }
  const inputMobileStyle =
    isMobile && focused
      ? {
          bgcolor: 'white.main',
          position: 'fixed',
          width: '100vw',
          left: -1,
          px: 2,
          zIndex: 100
        }
      : {}
  const dropDownMobileStyle =
    isMobile && focused
      ? {
          width: 'calc(100vw - 2rem) !important',
          '.MuiAutocomplete-listbox': {
            maxHeight: '80vh'
          }
        }
      : {}

  return (
    <Autocomplete
      sx={{
        '&.Mui-expanded': {
          '.MuiInputBase-root.MuiAutocomplete-inputRoot': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }
        },
        '+ .MuiAutocomplete-popper': {
          border: (theme) => `1px solid ${theme.palette.blue.main}`,
          borderTopColor: 'inputBorder.main',
          '.MuiAutocomplete-listbox': { maxHeight: '60vh' },
          ...dropDownMobileStyle
        },
        ...inputMobileStyle,
        ...mergeStyle
      }}
      {...rest}
    />
  )
}

export default RdAutoComplete
