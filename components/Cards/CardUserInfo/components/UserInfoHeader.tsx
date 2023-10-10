import { RdInlineInput } from '@/components'
import { TUserDetail } from '@/constants/types'
import { fullNameValidation } from '@/services'
import { Typography } from '@mui/material'
import { Control, FieldValues, Path, UseFormGetValues } from 'react-hook-form'

type TUserInfoHeaderProps<T extends FieldValues> = {
  isMe: boolean
  getValues: UseFormGetValues<T>
  control: Control<T>
  onSubmitField: (field: keyof T) => void
  user: TUserDetail | null
}

function UserInfoHeader<T extends FieldValues>({ isMe, getValues, control, onSubmitField, user }: TUserInfoHeaderProps<T>) {
  return (
    <>
      <Typography variant="h6" color="initial" fontWeight={700}>
        <RdInlineInput<T>
          editable={isMe}
          initialVal={getValues('fullName' as Path<T>)}
          registerOptions={{ validate: (val) => fullNameValidation(val) }}
          onFieldSubmit={onSubmitField}
          control={control}
          name={'fullName' as Path<T>}
          fontSize="1.2rem"
          endIcon
        />
      </Typography>
      <Typography variant="subtitle1" fontSize="0.8rem" sx={{ color: 'hintText.main' }}>
        u/{user?.username}
      </Typography>
    </>
  )
}

export default UserInfoHeader
