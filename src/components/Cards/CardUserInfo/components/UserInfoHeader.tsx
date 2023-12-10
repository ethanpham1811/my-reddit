import { RdInlineInput } from '@/src/components'
import { TUserDetail } from '@/src/constants/types'
import { Typography } from '@/src/mui'
import { fullNameValidation } from '@/src/services/formValidations'
import { Control, FieldValues, Path } from 'react-hook-form'

type TUserInfoHeaderProps<T extends FieldValues> = {
  control: Control<T>
  onSubmitField: (field: keyof T, val: unknown) => void
  user: TUserDetail | null
  isMe: boolean
}

function UserInfoHeader<T extends FieldValues>({ control, onSubmitField, user, isMe }: TUserInfoHeaderProps<T>) {
  return (
    <>
      <Typography variant="h6" color="black" fontWeight={700}>
        {isMe ? (
          <RdInlineInput<T>
            registerOptions={{ validate: (val) => fullNameValidation(val) }}
            onFieldSubmit={onSubmitField}
            control={control}
            name={'fullName' as Path<T>}
            fontSize="1.2rem"
            endIcon
          />
        ) : (
          user?.fullName || 'Anonymous'
        )}
      </Typography>
      <Typography variant="subtitle1" fontSize="0.8rem" sx={{ color: 'gray.dark' }}>
        u/{user?.username}
      </Typography>
    </>
  )
}

export default UserInfoHeader
