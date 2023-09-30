import { borderColorStyle } from '@/mui/styles'
import { FormControl, FormHelperText, InputLabel, SxProps, Theme, styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

type TRdInputProps<T extends FieldValues> = {
  placeholder: string
  name: FieldPath<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  helper?: boolean
  width?: string
  flex?: number
  sx?: SxProps<Theme>
  bgcolor?: string
}

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
  helper = false,
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
      {helper && <FormHelperText id={`helper_${name}`}>We'll never share your email.</FormHelperText>}
    </FormControl>
  )
}
export default RdInput
