import { RdSkeletonTextEditor } from '@/src/components/Skeletons'
import { FormControl, Typography } from '@/src/mui'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { TextEditorWrapper } from './components/TextEditorWrapper'

type TRdTextEditorProps<T extends FieldValues> = {
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  height?: number
}
function RdTextEditor<T extends FieldValues>({ height = 300, control, name, registerOptions }: TRdTextEditorProps<T>) {
  const [loading, setLoading] = useState(true)

  const options = {
    height,
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
  }

  return (
    <FormControl sx={{ flex: 1, display: 'flex', '.MuiFormControl-root': { bgcolor: 'transparent' } }}>
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextEditorWrapper height={height} display="flex" flexDirection="column">
            {loading && <RdSkeletonTextEditor height={height} />}
            {
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                value={value}
                onEditorChange={onChange}
                id={name}
                onInit={() => setLoading(false)}
                init={options}
              />
            }
            {error && (
              <Typography sx={{ pl: 1, pt: 0.5, color: 'orange.main' }} variant="caption">
                {error?.message}
              </Typography>
            )}
          </TextEditorWrapper>
        )}
      />
    </FormControl>
  )
}

export default RdTextEditor
