import { ImageOutlinedIcon } from '@/constants/icons'
import { TRdImageUploaderProps } from '@/constants/types'
import { FormControl } from '@mui/material'
import { Controller, FieldValues } from 'react-hook-form'

function RdImageUploader<T extends FieldValues>({ name, control }: TRdImageUploaderProps<T>) {
  return (
    <FormControl sx={{ '.MuiFormControl-root': { bgcolor: 'transparent' } }}>
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
              style={{
                width: '34px',
                height: '34px',
                position: 'absolute',
                top: '-7px',
                left: '-7px',
                display: 'block',
                border: '1px solid red',
                opacity: 0
              }}
            />
          </label>
        )}
      />
    </FormControl>
  )
}

export default RdImageUploader
