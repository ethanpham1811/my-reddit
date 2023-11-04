import { TRdStaticInputProps } from '@/constants/types'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import { FieldValues } from 'react-hook-form'

const RdInputBase = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    borderRadius: '4px',
    color: theme.palette.inputText.main,
    '&.Mui-focused, &:hover': {
      backgroundColor: 'white.main'
    },
    fieldset: {
      borderWidth: '1px !important'
    }
  }
}))

const RdStaticInput = <T extends FieldValues>({ borderColor, placeholder, label, sx, bgcolor, ...rest }: TRdStaticInputProps<T>) => {
  const borderStyle = borderColor ? { borderColor: borderColor } : {}

  return (
    <RdInputBase
      size="small"
      fullWidth
      label={label}
      placeholder={placeholder}
      variant="outlined"
      sx={{ '.MuiInputBase-root': { bgcolor: `${bgcolor ?? 'inputBgOutfocused'}.main`, '&.Mui-focused': { fieldset: { ...borderStyle } } }, ...sx }}
      {...rest}
    />
  )
}
export default RdStaticInput
