import { Typography } from '@/src/mui'
import { Control, FieldValues, Path } from 'react-hook-form'
import { RdRadioGroup } from '../..'
import { groupTypeOptions } from '../data'

type TCommunityTypeRadioProps<T extends FieldValues> = {
  control: Control<T>
}

function CommunityTypeRadio<T extends FieldValues>({ control }: TCommunityTypeRadioProps<T>) {
  return (
    <RdRadioGroup<T>
      options={groupTypeOptions}
      name={'subType' as Path<T>}
      control={control}
      sx={{ mt: 1 }}
      label={
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            color: 'black.main'
          }}
        >
          Community type
        </Typography>
      }
    />
  )
}

export default CommunityTypeRadio
