import { ImageOutlinedIcon } from '@/constants/icons'
import { TRdImageUploaderProps } from '@/constants/types'
import { FormControl } from '@mui/material'
import { Controller, FieldValues } from 'react-hook-form'

function RdImageUploader<T extends FieldValues>({ name, control }: TRdImageUploaderProps<T>) {
  return (
    <FormControl sx={{ '.MuiFormControl-root': { bgcolor: 'transparent' } }}>
      <div>
        <div>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <label htmlFor="upload-image">
                <ImageOutlinedIcon sx={{ display: 'block' }} />
                <input
                  id="upload-image"
                  multiple
                  hidden
                  accept="image/jpg, image/png, image/jpeg, image/webp, image/gif"
                  type="file"
                  onChange={(e) => onChange(e.target.files)}
                />
              </label>
            )}
          />
        </div>
      </div>
    </FormControl>
  )
}

export default RdImageUploader
