import { TRadioOption, TRdRadioGroupProps } from '@/constants/types'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Controller, FieldValues } from 'react-hook-form'
import { v4 as rid } from 'uuid'

const RdRadioGroup = <T extends FieldValues>({ options, name, control, label }: TRdRadioGroupProps<T>) => {
  return (
    <FormControl>
      <FormLabel id={`${name}-radio-group`} sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup onChange={onChange} value={value} aria-labelledby={`${name} radio group`} name={`${name}-radio-group`}>
            {options.map(({ value, label, disabled }: TRadioOption) => (
              <FormControlLabel
                key={`option_${rid()}`}
                value={value}
                control={<Radio sx={{ '&.Mui-checked': { color: 'unset' } }} />}
                label={label}
                disabled={disabled}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  )
}
export default RdRadioGroup
