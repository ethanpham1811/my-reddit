import { FormControl, FormHelperText, InputLabel, TextField } from '@/mui'
import { TextFieldProps } from '@mui/material/TextField'
import { Dispatch, SetStateAction, useRef } from 'react'
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

type RdNakedInputProps<T extends FieldValues> = TextFieldProps & {
  label?: string
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  helper?: string
  editMode?: boolean
  onChangeCb?: Dispatch<SetStateAction<string | null>>
}

/**
 * Input without border with
 * @param  {NextPageContext} ctx
 */
function RdNakedInput<T extends FieldValues>({
  label,
  helper,
  registerOptions,
  name,
  control,
  fullWidth,
  sx,
  editMode,
  onChangeCb,
  ...rest
}: RdNakedInputProps<T>) {
  const ref = useRef<HTMLInputElement | null>(null)

  function onKeyput() {
    onChangeCb && onChangeCb(ref?.current?.value || null)
  }

  return (
    <FormControl fullWidth>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <TextField
              id="comment-box"
              fullWidth
              variant="standard"
              error={!!error}
              inputRef={ref}
              onInput={onKeyput}
              onChange={onChange}
              value={value || ''}
              helperText={error ? error.message : null}
              sx={{
                borderWidth: '1px',
                '.MuiInputBase-root': {
                  '&::before, &::after': {
                    borderWidth: '1px !important',
                    borderColor: 'inputBorder.main'
                  }
                },
                ...sx
              }}
              {...rest}
            />
          )
        }}
      />
      {helper && <FormHelperText id={`helper_${name}`}>{helper}</FormHelperText>}
    </FormControl>
  )
}

export default RdNakedInput
