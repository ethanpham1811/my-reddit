import { Autocomplete } from '@mui/material'

import { TRdAutoCompleteProps } from '@/constants/types'
import { borderColorStyle } from '@/mui/styles'

function RdAutoComplete<
  OptionType,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipCom extends React.ElementType<any> = 'div'
>({ width, sx, flex, ...rest }: TRdAutoCompleteProps<OptionType, Multiple, DisableClearable, FreeSolo, ChipCom>) {
  return (
    <Autocomplete
      {...rest}
      sx={{
        '&.Mui-expanded': {
          '.MuiInputBase-root': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }
        },
        '+ .MuiAutocomplete-popper': {
          border: (theme) => `1px solid ${theme.palette.blue.main}`,
          borderTopColor: 'inputBorder.main'
        },
        ...borderColorStyle
      }}
    />
  )
}

export default RdAutoComplete
