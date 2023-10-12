import { TRdStaticInputProps } from '@/constants/types'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import { FieldValues } from 'react-hook-form'

const RdInputBase = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    borderRadius: '4px',
    color: theme.palette.inputText.main,
    '&.Mui-focused, &:hover': {
      backgroundColor: 'white'
    }
  }
}))

const RdStaticInput = <T extends FieldValues>({ placeholder, label, sx, bgcolor, ...rest }: TRdStaticInputProps<T>) => {
  return (
    <RdInputBase
      // helperText={error ? error.message : null}
      size="small"
      // error={!!error}
      // onChange={onChange}
      // value={value}
      fullWidth
      label={label}
      placeholder={placeholder}
      variant="outlined"
      // id={name}
      // aria-describedby={`helper_${name}`}
      sx={{ '.MuiInputBase-root': { bgcolor: `${bgcolor ?? 'inputBgOutfocused'}.main` }, ...sx }}
      {...rest}
    />
  )
}
export default RdStaticInput
