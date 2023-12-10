import { RdDatePicker } from '@/src/components'
import { Brightness5OutlinedIcon, CakeOutlinedIcon } from '@/src/constants/icons'
import { TUserDetail } from '@/src/constants/types'
import { Stack, Typography } from '@/src/mui'
import format from 'date-fns/format'
import { Dayjs } from 'dayjs'
import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'

type TUserInfoExtraProps<T extends FieldValues> = {
  user: TUserDetail | null
  isMe: boolean
  control: Control<T>
  registerOptions?: RegisterOptions
  onSubmitField: (field: keyof T, val: Dayjs | null) => void
}

// const date10YearsBack = new Date()
// date10YearsBack.setFullYear(date10YearsBack.getFullYear() - 10)

function UserInfoExtra<T extends FieldValues>({ user, isMe, control, onSubmitField }: TUserInfoExtraProps<T>) {
  return (
    <Stack direction="row">
      <Stack flex={1} spacing={0.5} alignItems="center">
        <Typography fontWeight={700} variant="body1" sx={{ textAlign: 'center' }}>
          Karma
        </Typography>
        <Typography display="flex" alignItems="center" variant="body1" fontSize="0.8rem" sx={{ color: 'gray.dark', textAlign: 'center' }}>
          <Brightness5OutlinedIcon sx={{ fontSize: '1rem', mr: 1, color: 'blue.main' }} />
          {user?.karma}
        </Typography>
      </Stack>
      <Stack flex={1} spacing={0.5}>
        <Typography fontWeight={700} variant="body1" sx={{ textAlign: 'center' }}>
          Cake day
        </Typography>
        {!isMe ? (
          <Typography variant="body1" fontSize="0.8rem" sx={{ color: 'gray.dark', textAlign: 'center' }}>
            <CakeOutlinedIcon sx={{ fontSize: '0.8rem', mr: 0.5, color: 'blue.main' }} /> {user?.dob ? format(new Date(user.dob), 'P') : 'N/A'}
          </Typography>
        ) : (
          <RdDatePicker label={false} disableFuture name={'dob' as Path<T>} control={control} onSubmitField={onSubmitField} />
        )}
      </Stack>
    </Stack>
  )
}

export default UserInfoExtra
