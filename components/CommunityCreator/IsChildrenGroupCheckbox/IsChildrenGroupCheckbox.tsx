import { BORDER_TYPES } from '@/constants/enums'
import { FormControl, FormLabel, Stack, Typography } from '@/mui'
import { Control, FieldValues, Path } from 'react-hook-form'
import { RdCheckbox } from '../..'
import RdChip from '../../utilities/RdChip/RdChip'

type IsChildrenGroupCheckboxProps<T extends FieldValues> = {
  control: Control<T>
}
function IsChildrenGroupCheckbox<T extends FieldValues>({ control }: IsChildrenGroupCheckboxProps<T>) {
  return (
    <FormControl>
      <FormLabel id="isChildrenContent-radio-group" sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
        <Typography variant="h5" sx={{ mt: 2, color: 'black.main' }}>
          Children content
        </Typography>
      </FormLabel>
      <RdCheckbox<T>
        control={control}
        name={'isChildrenContent' as Path<T>}
        label={
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <RdChip shape={BORDER_TYPES.Rounded} clickable={false} size="small" label="Super SFW" color="success" variant="filled" />
            &nbsp;
            <Typography variant="body1" fontWeight={600} component="span">
              Under 18 years old community
            </Typography>
          </Stack>
        }
      />
    </FormControl>
  )
}

export default IsChildrenGroupCheckbox
