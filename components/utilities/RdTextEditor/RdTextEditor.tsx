import { TRdTextEditorProps } from '@/constants/types'
import { Box, FormControl, Skeleton, Typography } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

function RdTextEditor<T extends FieldValues>({ height = 300, placeholder, control, name, registerOptions }: TRdTextEditorProps<T>) {
  const [isFirstTimeFocused, setIsFirstTimeFocused] = useState(true)
  const [loading, setLoading] = useState(true)

  return (
    <FormControl sx={{ '.MuiFormControl-root': { bgcolor: 'transparent' } }}>
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Box height={height} display="flex" flexDirection="column">
            {loading && (
              <Box position="absolute" width="100%" height={300}>
                <Skeleton variant="text" width="100%" height="39px" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rounded" width="100%" height="224px" />
                <Skeleton variant="text" width="100%" height="19px" sx={{ fontSize: '1rem' }} />
              </Box>
            )}
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
              // initialValue={`<p>${placeholder}</p>`}
              value={value}
              onEditorChange={onChange}
              id={name}
              onInit={() => setLoading(false)}
              onFocus={(): void => {
                if (isFirstTimeFocused) {
                  setIsFirstTimeFocused(false)
                  onChange('')
                }
              }}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image',
                  'charmap print preview anchor help',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | removeformat | help'
              }}
            />
            {error && (
              <Typography sx={{ pl: 1, pt: 0.5, color: 'orange.main' }} variant="caption">
                {error?.message}
              </Typography>
            )}
          </Box>
        )}
      />
    </FormControl>
  )
}

export default RdTextEditor
