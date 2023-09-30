import { FormControl } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

type TRdTextEditorProps<T extends FieldValues> = {
  placeholder: string
  name: FieldPath<T>
  control: Control<T>
}

function RdTextEditor<T extends FieldValues>({ placeholder, control, name }: TRdTextEditorProps<T>) {
  return (
    <FormControl sx={{ '.MuiFormControl-root': { bgcolor: 'transparent' } }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
            initialValue={`<p>${placeholder}</p>`}
            value={value}
            onEditorChange={onChange}
            id={name}
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
        )}
      />
    </FormControl>
  )
}

export default RdTextEditor
