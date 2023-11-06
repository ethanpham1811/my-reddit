import { Checkbox, FormGroup } from '@/mui'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactNode } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

type TRdCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label: string | ReactNode
}
const RdCheckbox = <T extends FieldValues>({ name, control, label }: TRdCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormGroup>
          <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: 'unset' } }} checked={value} onChange={onChange} />} label={label} />
        </FormGroup>
      )}
    />
  )
}
export default RdCheckbox
