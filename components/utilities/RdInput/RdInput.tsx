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
  registerOptions,
  name,
  control,
  label,
  flex,
  width,
  helper,
  sx,
  bgcolor,
  indentedHelper,
  endIcon,
  ...rest
}: TRdInputProps<T>) => {
  return (
    <FormControl sx={{ flex, '.MuiFormControl-root': { bgcolor: 'transparent' }, ...borderColorStyle, width }}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
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
            autoComplete="off"
            id={name}
            aria-describedby={`helper_${name}`}
            sx={{
              '.MuiFormHelperText-root.Mui-error': { color: 'orange.main', mx: 0 },
              '.MuiInputBase-root': { bgcolor: `${bgcolor ?? 'inputBgOutfocused'}.main` },
              '.MuiFormHelperText-root': {
                pl: indentedHelper ? 1 : 0
              },
              ...sx
            }}
            InputProps={{
              endAdornment: endIcon
            }}
            {...rest}
          />
        )}
      />
      {helper && <FormHelperText id={`helper_${name}`}>{helper}</FormHelperText>}
    </FormControl>
  )
}
export default RdInput
