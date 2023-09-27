import { borderColorStyle } from '@/mui/styles'
import { FormControl, FormHelperText, InputLabel, styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type RdInputProps<T extends FieldValues> = {
  placeholder: string
  // value?: string | number
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  // register?: (options?: RegisterOptions) => void
  name: FieldPath<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  helper?: boolean
}

const RdInputBase = styled(TextField)(({ theme }) => {
  return {
    '.MuiInputBase-root': {
      borderRadius: '4px',
      // border: `1px solid ${theme.palette.inputBorder.main}`,
      backgroundColor: theme.palette.inputBgOutfocused.main,
      color: theme.palette.inputText.main,
      '&.Mui-focused, &:hover': {
        backgroundColor: 'white'
      }
    }
  }
})

const RdInput = <T extends FieldValues>({ name, control, label, placeholder, disabled = false, helper = false }: RdInputProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <FormControl sx={{ '.MuiFormControl-root': { backgroundColor: 'transparent' }, ...borderColorStyle }}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
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
      />
      {helper && <FormHelperText id={`helper_${name}`}>We'll never share your email.</FormHelperText>}
    </FormControl>
  )
}
export default RdInput
