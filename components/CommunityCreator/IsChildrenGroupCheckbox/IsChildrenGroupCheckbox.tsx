import { IsChildrenGroupCheckboxProps } from '@/constants/types'
import { FormControl, FormLabel, Stack, Typography } from '@mui/material'
import { FieldValues } from 'react-hook-form'
import { RdCheckbox } from '../..'
import RdChip from '../../utilities/RdChip/RdChip'

function IsChildrenGroupCheckbox<T extends FieldValues>({ name, control }: IsChildrenGroupCheckboxProps<T>) {
  return (
    <FormControl>
      <FormLabel id={`${name}-radio-group`}>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Children content
        </Typography>
      </FormLabel>
      <RdCheckbox<T>
        control={control}
        name="isChildrenContent"
        label={
          <Stack direction="row" alignItems="center">
            <RdChip clickable={false} size="small" label="Super SFW" color="success" variant="filled" />
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
