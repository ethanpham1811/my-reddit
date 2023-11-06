import { CreateOutlinedIcon } from '@/constants/icons'
import { TRdInlineInputProps } from '@/constants/types'
import { Box, FormControl, FormHelperText, InputLabel, TextField } from '@/mui'
import { borderColorStyle } from '@/mui/styles'
import { FocusEvent, useRef, useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

const RdInlineInput = <T extends FieldValues>({
  registerOptions,
  onFieldSubmit,
  name,
  control,
  label,
  width,
  helper,
  sx,
  fontSize,
  center,
  endIcon,
  ...rest
}: TRdInlineInputProps<T>) => {
  const [editing, setEditing] = useState(false)
  const labelRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    setEditing(false)
    onFieldSubmit(name, e.target.value)
  }

  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '.MuiFormControl-root': { bgcolor: 'transparent' },
        ...borderColorStyle,
        width
      }}
    >
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value, name }, fieldState: { error } }) => {
          return (
            <>
              {editing ? (
                <TextField
                  autoFocus
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  onKeyUp={(e) => {
                    e.key === 'Enter' && e.currentTarget.querySelector('input')?.blur()
                  }}
                  onBlur={handleSubmit}
                  value={value || ''}
                  label={label}
                  autoComplete="off"
                  id={name}
                  aria-describedby={`helper_${name}`}
                  sx={{
                    alignItems: center ? 'center' : 'left',
                    '.MuiFormHelperText-root.Mui-error': { color: 'orange.main', mx: 0 },
                    '.MuiInputBase-root': {
                      p: 0,
                      input: {
                        py: 0,
                        px: 0,
                        height: 'auto',
                        textAlign: center ? 'center' : 'left',
                        fontSize: fontSize ?? '14px',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        '&.Mui-disabled': {
                          color: 'inherit'
                        }
                      },
                      fieldset: { border: 'none' },
                      '&.Mui-focused': {
                        bgcolor: 'primary.main'
                      }
                    },
                    ...sx
                  }}
                  {...rest}
                />
              ) : (
                <Box
                  onClick={() => setEditing(true)}
                  ref={labelRef}
                  width="max-content"
                  whiteSpace="nowrap"
                  fontSize={fontSize ?? '14px'}
                  fontWeight={500}
                >
                  {value}
                  <CreateOutlinedIcon
                    sx={{
                      ml: 1,
                      bgcolor: 'transparent',
                      fontSize: '1rem',
                      color: 'hintText.main'
                    }}
                  />
                </Box>
              )}
            </>
          )
        }}
      />
      {helper && <FormHelperText id={`helper_${name}`}>{helper}</FormHelperText>}
    </FormControl>
  )
}
export default RdInlineInput
