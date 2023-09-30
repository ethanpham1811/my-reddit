import { Autocomplete, CircularProgress, FormControl, TextField } from '@mui/material'
import { ReactNode } from 'react'

import { KeyboardArrowDownIcon } from '@/constants/icons'
import { TSubreddit } from '@/constants/types'
import { borderColorStyle } from '@/mui/styles'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type TRdAutoComplete<T extends FieldValues> = {
  options: TSubreddit[]
  startAdornment?: ReactNode
  placeholder: string
  id: string
  loading: boolean
  arrow?: boolean
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
  bgcolor?: string
}

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
}: TRdAutoComplete<T>) {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })
  const customPaddingLeft = startAdornment ? {} : { pl: 3 }

  return (
    <FormControl sx={{ display: 'flex', flex, width }}>
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
        isOptionEqualToValue={(option, value) => option.topic === value.topic}
        getOptionLabel={(option) => option.topic}
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
    </FormControl>
  )
}

export default RdAutoComplete
