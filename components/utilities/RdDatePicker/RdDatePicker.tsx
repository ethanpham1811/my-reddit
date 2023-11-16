import { useMediaQuery, useTheme } from '@/mui'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

type TRdDatePickerProps<T extends FieldValues> = DatePickerProps<Dayjs> & {
  width?: string
  name: FieldPath<T>
  control: Control<T>
  registerOptions?: RegisterOptions
  onSubmitField: (field: keyof T, val: Dayjs | null) => void
}

function RdDatePicker<T extends FieldValues>({ width, name, control, registerOptions, onSubmitField, ...rest }: TRdDatePickerProps<T>) {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('lg'))

  return (
    <Controller
      name={name}
      control={control}
      rules={registerOptions}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(val) => {
                onSubmitField(name, val)
                onChange(val)
              }}
              value={dayjs(value)}
              label="Date of birth"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                '.MuiInputBase-root': {
                  mx: 'auto',
                  width: width ?? '100px',
                  p: 0,
                  input: { p: 0, fontSize: '0.8rem', color: `${isMobile ? 'blue' : 'hintText'}.main`, textAlign: 'center' },
                  fieldset: { display: 'none' },
                  '.MuiInputAdornment-root': {
                    ml: 0,
                    '.MuiIconButton-root': { color: 'blue.main', position: 'relative', top: -1 }
                  }
                }
              }}
              {...rest}
            />
          </LocalizationProvider>
        )
      }}
    />
  )
}

export default RdDatePicker
