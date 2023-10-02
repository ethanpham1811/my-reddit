import { TRdCheckboxProps } from '@/constants/types'
import { Checkbox, FormGroup } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Controller, FieldValues } from 'react-hook-form'

const RdCheckbox = <T extends FieldValues>({ name, control, label, ...rest }: TRdCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={value} defaultChecked onChange={onChange} />} label={label} />
        </FormGroup>
      )}
    />
  )
}
export default RdCheckbox
