import { Autocomplete, CircularProgress, FormControl, TextField } from '@mui/material'

import { KeyboardArrowDownIcon } from '@/constants/icons'
import { TRdAutoCompleteProps } from '@/constants/types'
import { borderColorStyle } from '@/mui/styles'
import { Controller, FieldValues } from 'react-hook-form'

function RdAutoComplete<T extends FieldValues>({
  name,
  control,
  width,
  flex,
  options,
  loading,
  startAdornment,
  placeholder,
  id,
  bgcolor,
  arrow
}: TRdAutoCompleteProps<T>) {
  const customPaddingLeft = startAdornment ? {} : { pl: 3 }

  return (
    <FormControl sx={{ display: 'flex', flex, width }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id={id}
            sx={{
              '&.Mui-expanded': {
                '.MuiInputBase-root': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }
              },
              ...borderColorStyle
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            options={options}
            onChange={onChange}
            value={value}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment,
                  endAdornment: <>{loading ? <CircularProgress color="inherit" size={20} /> : arrow ? <KeyboardArrowDownIcon /> : null}</>,
                  placeholder
                }}
                sx={{
                  '.MuiInputBase-root': {
                    borderRadius: '1.5rem',
                    width: '100%',
                    pr: '1rem !important',
                    bgcolor: `${bgcolor ?? 'inputBgOutfocused'}.main`,
                    '.MuiSvgIcon-root': {
                      mx: 1
                    },
                    '&.Mui-focused, &:hover': {
                      bgcolor: 'white.main'
                    },
                    ...customPaddingLeft
                  },
                  'input.MuiAutocomplete-input': {
                    p: '0 !important'
                  },
                  '[aria-expanded=true]': {
                    '~ .MuiOutlinedInput-notchedOutline': { borderBottom: 'none' }
                  }
                }}
              />
            )}
          />
        )}
      />
    </FormControl>
  )
}

export default RdAutoComplete
