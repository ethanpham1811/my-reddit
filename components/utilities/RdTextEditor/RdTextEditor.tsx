import { Box, FormControl, Skeleton } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

type TRdTextEditorProps<T extends FieldValues> = {
  placeholder: string
  name: FieldPath<T>
  control: Control<T>
}

function RdTextEditor<T extends FieldValues>({ placeholder, control, name }: TRdTextEditorProps<T>) {
  const [isFirstTimeFocused, setIsFirstTimeFocused] = useState(true)
  const [loading, setLoading] = useState(true)

  return (
    <FormControl sx={{ '.MuiFormControl-root': { bgcolor: 'transparent' } }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Box height={300}>
            {loading && (
              <Box position="absolute" width="100%" height={300}>
                <Skeleton variant="text" width="100%" height="39px" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rounded" width="100%" height="224px" />
                <Skeleton variant="text" width="100%" height="19px" sx={{ fontSize: '1rem' }} />
              </Box>
            )}
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
              initialValue={`<p>${placeholder}</p>`}
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
          </Box>
        )}
      />
    </FormControl>
  )
}

export default RdTextEditor
