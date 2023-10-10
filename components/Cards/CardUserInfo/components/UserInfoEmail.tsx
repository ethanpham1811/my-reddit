import { RdInlineInput } from '@/components'
import { EmailOutlinedIcon } from '@/constants/icons'
import { emailValidation } from '@/services'
import { Box } from '@mui/material'
import { Control, FieldValues, Path, UseFormGetValues } from 'react-hook-form'

type TUserInfoEmailProps<T extends FieldValues> = {
  isMe: boolean
  getValues: UseFormGetValues<T>
  control: Control<T>
  onSubmitField: (field: keyof T) => void
}

function UserInfoEmail<T extends FieldValues>({ isMe, getValues, control, onSubmitField }: TUserInfoEmailProps<T>) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <EmailOutlinedIcon sx={{ fontSize: '0.8rem', mr: 1, color: 'blue.main' }} />
      <RdInlineInput<T>
        editable={isMe}
        initialVal={getValues('email' as Path<T>)}
        registerOptions={{ validate: (val) => emailValidation(val) }}
        onFieldSubmit={onSubmitField}
        control={control}
        name={'email' as Path<T>}
        center
        endIcon
      />
    </Box>
  )
}

export default UserInfoEmail
