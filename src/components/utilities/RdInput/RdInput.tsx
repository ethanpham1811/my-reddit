import { TRdInputProps } from '@/src/constants/types'
import { FormControl, FormHelperText, InputLabel, TextField, styled } from '@/src/mui'
import { borderColorStyle } from '@/src/mui/styles'
import { ForwardedRef, ReactElement, forwardRef } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

const RdInputBase = styled(TextField)(({ theme }) => {
  return {
    '.MuiInputBase-root': {
      borderRadius: '4px',
      color: theme.palette.secondary.main,
      '&.Mui-focused, &:hover': {
        backgroundColor: 'white.main'
      }
    }
  }
})

const RdInput = <T extends FieldValues>(
  {
    registerOptions,
    letterCount,
    name,
    control,
    label,
    flex,
    width,
    height,
    helper,
    sx,
    bgcolor,
    indentedHelper,
    endIcon,
    ...rest
  }: TRdInputProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <FormControl sx={{ flex, '.MuiFormControl-root': { bgcolor: 'transparent' }, ...borderColorStyle, width }}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <RdInputBase
              inputRef={ref}
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              onChange={onChange}
              value={value || ''}
              fullWidth
              label={label}
              variant="outlined"
              autoComplete="off"
              id={name}
              aria-describedby={`helper_${name}`}
              sx={{
                '.MuiFormHelperText-root.Mui-error': { color: 'orange.main', mx: 0 },
                '.MuiInputBase-root': {
                  bgcolor: `${bgcolor ?? 'inputBgOutfocused'}.main`,
                  input: {
                    height
                  }
                },
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
            {helper && !error && <FormHelperText id={`helper_${name}`}>{helper}</FormHelperText>}
            {letterCount && !error && (
              <FormHelperText id={`helper_${name}`} sx={{ mx: 0, mt: '4px' }}>
                {letterCount - (value?.length || 0)} characters remaining
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  )
}

export default forwardRef(RdInput) as <T extends FieldValues>(p: TRdInputProps<T> & { ref?: ForwardedRef<HTMLInputElement> }) => ReactElement
