import { TRdStaticInputProps } from '@/src/constants/types'
import { styled, TextField } from '@/src/mui'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
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

function RdStaticInput<T extends FieldValues>(
  { borderColor, placeholder, label, sx, bgcolor, ...rest }: TRdStaticInputProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const borderStyle = borderColor ? { borderColor: borderColor } : {}

  return (
    <RdInputBase
      inputRef={ref}
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
export default forwardRef(RdStaticInput) as <T extends FieldValues>(p: TRdStaticInputProps<T>, ref: ForwardedRef<HTMLInputElement>) => ReactElement
