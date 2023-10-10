import { CreateOutlinedIcon } from '@/constants/icons'
import { TRdInlineInputProps } from '@/constants/types'
import { borderColorStyle } from '@/mui/styles'
import { Box, FormControl, FormHelperText, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useEffect, useRef, useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

const RdInlineInput = <T extends FieldValues>({
  registerOptions,
  onFieldSubmit,
  editable,
  name,
  control,
  label,
  flex,
  width,
  helper,
  sx,
  fontSize,
  initialVal,
  loading,
  center,
  endIcon,
  ...rest
}: TRdInlineInputProps<T>) => {
  const [inputValue, setInputValue] = useState(initialVal != null ? initialVal.toString() : initialVal)
  const [inputWidth, setInputWidth] = useState('auto')
  const inputRef = useRef<HTMLDivElement | null>(null)
  const hiddenDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (hiddenDivRef.current == null || inputValue == null) return

    // Measure the width of the hidden div based on the input's value
    const hiddenDiv = hiddenDivRef.current
    hiddenDiv.textContent = inputValue
    const divWidth = hiddenDiv.offsetWidth

    // Set the input's width to match the div's width
    setInputWidth(divWidth + 'px')
  }, [inputValue])

  const handleSubmit = () => editable && onFieldSubmit(name)

  return (
    <FormControl sx={{ flex, position: 'relative', '.MuiFormControl-root': { bgcolor: 'transparent' }, ...borderColorStyle, width }}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value, name }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={(e) => {
              setInputValue(e.target.value)
              onChange(e)
            }}
            onKeyUp={(e) => {
              if (e.key !== 'Enter') return
              e.currentTarget.querySelector('input')?.blur()
            }}
            onBlur={handleSubmit}
            value={value}
            label={label}
            autoComplete="off"
            id={name}
            aria-describedby={`helper_${name}`}
            ref={inputRef}
            sx={{
              alignItems: center ? 'center' : 'left',
              '.MuiFormHelperText-root.Mui-error': { color: 'orange.main', mx: 0 },
              '.MuiInputBase-root': {
                p: 0,
                width: endIcon ? `calc(25px + ${inputWidth})` : inputWidth,
                input: {
                  width: inputWidth,
                  p: 0,
                  textAlign: center ? 'center' : 'left',
                  fontSize: fontSize ?? '14px',
                  fontWeight: 500
                },
                // border: '1px solid black',
                bgcolor: 'transparent',
                fieldset: { border: 'none' },
                '&.Mui-focused': {
                  bgcolor: editable ? 'primary.main' : 'inherit'
                }
              },
              ...sx
            }}
            InputProps={{
              endAdornment: endIcon && editable && <CreateOutlinedIcon sx={{ ml: '5px', fontSize: '1rem', color: 'hintText.main' }} />,
              readOnly: !editable
            }}
            {...rest}
          />
        )}
      />
      {helper && <FormHelperText id={`helper_${name}`}>{helper}</FormHelperText>}
      <Box
        ref={hiddenDivRef}
        visibility="hidden"
        border="1px solid red"
        position="absolute"
        whiteSpace="nowrap"
        fontSize={fontSize ?? '14px'}
        fontWeight={500}
      ></Box>
    </FormControl>
  )
}
export default RdInlineInput
