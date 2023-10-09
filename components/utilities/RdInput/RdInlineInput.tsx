import { TRdInlineInputProps } from '@/constants/types'
import { borderColorStyle } from '@/mui/styles'
import { FormControl, FormHelperText, InputLabel, styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import { FocusEvent, KeyboardEvent, useRef, useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

const RdInputBase = styled(TextField)(({ theme }) => {
  return {
    '.MuiInputBase-root': {
      borderRadius: '4px',
      color: theme.palette.inputText.main
    }
  }
})

const RdInlineInput = <T extends FieldValues>({
  registerOptions,
  onSubmit,
  editable,
  name,
  control,
  label,
  flex,
  width,
  helper,
  sx,
  endIcon,
  ...rest
}: TRdInlineInputProps<T>) => {
  const [editMode, setEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onClick = () => {
    setEditMode(true)
  }

  const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    console.log(123)
    onSubmit(e)
    setEditMode(false)
  }

  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      inputRef?.current?.blur()
    }
  }

  return (
    <FormControl sx={{ flex, '.MuiFormControl-root': { bgcolor: 'transparent' }, ...borderColorStyle, width }}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            ref={inputRef}
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onClick={onClick}
            onChange={onChange}
            onBlur={(e) => {
              onSubmit(e)
              setEditMode(false)
            }}
            onKeyUp={onKeyUp}
            type=""
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            autoComplete="off"
            id={name}
            aria-describedby={`helper_${name}`}
            sx={{
              '.MuiFormHelperText-root.Mui-error': { color: 'orange.main', mx: 0 },
              '.MuiInputBase-root': { bgcolor: editMode ? 'blue.main' : 'primary.main' },
              ...sx
            }}
            InputProps={{
              endAdornment: endIcon,
              readOnly: !editable || !editMode
            }}
            {...rest}
          />
        )}
      />
      {helper && <FormHelperText id={`helper_${name}`}>{helper}</FormHelperText>}
    </FormControl>
  )
}
export default RdInlineInput
