import { Box, FormControl, Skeleton, Typography } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

type TRdTextEditorProps<T extends FieldValues> = {
  registerOptions?: RegisterOptions
  placeholder: string
  name: FieldPath<T>
  control: Control<T>
  height?: number
  clearBodyOnFocus?: boolean
}
function RdTextEditor<T extends FieldValues>({ height = 300, control, name, registerOptions, clearBodyOnFocus = true }: TRdTextEditorProps<T>) {
  const [isFirstTimeFocused, setIsFirstTimeFocused] = useState(true)
  const [loading, setLoading] = useState(true)

  return (
    <FormControl sx={{ flex: 1, display: 'flex', '.MuiFormControl-root': { bgcolor: 'transparent' } }}>
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Box
            height={height}
            display="flex"
            flexDirection="column"
            sx={{
              '.tox-tinymce': {
                borderWidth: '1px',
                borderColor: 'inputBorder.main',
                borderRadius: '4px',
                '&:not(.tox-tinymce-inline) .tox-editor-header': {
                  backgroundColor: 'white.main'
                },
                '.tox-toolbar-overlord': {
                  backgroundColor: 'white.main',
                  color: 'black.main'
                },
                '.tox-toolbar__primary': {
                  backgroundColor: 'white.main',
                  color: 'black.main'
                },
                '.tox-edit-area__iframe': {
                  backgroundColor: 'tinyEditor.main'
                },
                '.tox-statusbar': {
                  backgroundColor: 'white.main',
                  color: 'black.main'
                },
                '.tox-tbtn svg': {
                  color: 'black.main'
                }
              }
            }}
          >
            {loading && (
              <Box position="absolute" width="100%" height={300}>
                <Skeleton variant="text" width="100%" height="39px" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rounded" width="100%" height={height - 60 + 'px'} />
                <Skeleton variant="text" width="100%" height="19px" sx={{ fontSize: '1rem' }} />
              </Box>
            )}
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
              value={value}
              onEditorChange={onChange}
              id={name}
              onInit={() => setLoading(false)}
              onFocus={(): void => {
                if (isFirstTimeFocused && clearBodyOnFocus) {
                  setIsFirstTimeFocused(false)
                  onChange('')
                }
              }}
              init={{
                height: 300,
                menubar: false,
                color_default_background: '#000',
                color_cols_background: 1,
                color_map: ['#000'],
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
