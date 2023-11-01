import { BORDER_TYPES } from '@/constants/enums'
import { FormControl, FormLabel, Stack, Typography } from '@mui/material'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { RdCheckbox } from '../..'
import RdChip from '../../utilities/RdChip/RdChip'

type IsChildrenGroupCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
}
function IsChildrenGroupCheckbox<T extends FieldValues>({ name, control }: IsChildrenGroupCheckboxProps<T>) {
  return (
    <FormControl>
      <FormLabel id={`${name}-radio-group`} sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Children content
        </Typography>
      </FormLabel>
      <RdCheckbox<T>
        control={control}
        name={name}
        label={
          <Stack direction="row" alignItems="center">
            <RdChip shape={BORDER_TYPES.Rounded} clickable={false} size="small" label="Super SFW" color="success" variant="filled" />
            &nbsp;
            <Typography variant="body1" fontWeight={600} component="span">
              18- year old community
            </Typography>
          </Stack>
        }
      />
    </FormControl>
  )
}

export default IsChildrenGroupCheckbox
