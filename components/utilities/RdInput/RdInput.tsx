import { TRdInputProps } from '@/constants/types'
import { borderColorStyle } from '@/mui/styles'
import { FormControl, FormHelperText, InputLabel, styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller, FieldValues } from 'react-hook-form'

const RdInputBase = styled(TextField)(({ theme }) => {
  return {
    '.MuiInputBase-root': {
      borderRadius: '4px',
      color: theme.palette.inputText.main,
      '&.Mui-focused, &:hover': {
        backgroundColor: 'white'
      }
    }
  }
})

const RdInput = <T extends FieldValues>({
  name,
  control,
  label,
  flex,
  width,
  placeholder,
  disabled = false,
  helper,
  sx,
  bgcolor
}: TRdInputProps<T>) => {
  return (
    <FormControl sx={{ flex, '.MuiFormControl-root': { bgcolor: 'transparent' }, ...borderColorStyle, width }}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RdInputBase
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            disabled={disabled}
            placeholder={placeholder}
            id={name}
            aria-describedby={`helper_${name}`}
            sx={{ '.MuiInputBase-root': { bgcolor: `${bgcolor ?? 'inputBgOutfocused'}.main`, ...sx } }}
          />
        )}
      />
      {helper && <FormHelperText id={`helper_${name}`}>{helper}</FormHelperText>}
    </FormControl>
  )
}
export default RdInput
