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
      <FormLabel id={`${name}-radio-group`}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup onChange={onChange} value={value} aria-labelledby={`${name} radio group`} name={`${name}-radio-group`}>
            {options.map((option: TRadioOption) => (
              <FormControlLabel key={`option_${rid()}`} value={option.value} control={<Radio />} label={option.label} />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  )
}
export default RdRadioGroup
