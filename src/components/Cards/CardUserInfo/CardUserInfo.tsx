import { useAppSession } from '@/src/Layouts/MainLayout'
import { RdSkeleton } from '@/src/components/Skeletons'
import { TCardUserInfoForm, TCardUserInfoProps } from '@/src/constants/types'
import { useUserInfoForm, useUserUpdate } from '@/src/hooks'
import { CardContent, Divider } from '@/src/mui'
import { RdCard } from '../..'
import { UserButtons, UserInfoEmail, UserInfoExtra, UserInfoFollower, UserInfoHeader, UserInfoMedia } from './components/'

function CardUserInfo({ user, loading: userLoading }: TCardUserInfoProps) {
  const { session } = useAppSession()
  const { updateUser } = useUserUpdate()
  const isMe = session?.userDetail?.username === user?.username
  const { control, onChangeUserInfo } = useUserInfoForm(user, updateUser)

  return (
    <RdCard sx={{ gap: 1, flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      {!userLoading ? (
        <>
          <UserInfoMedia user={user} />
          <form onSubmit={(e) => e.preventDefault()}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              {/* Usser avatar & cover */}
              <UserInfoHeader<TCardUserInfoForm> control={control} onSubmitField={onChangeUserInfo} user={user} isMe={isMe} />
              <Divider sx={{ my: 1 }} />

              {/* User email */}
              <UserInfoEmail user={user} />
              <Divider sx={{ my: 1 }} />

              {/* User karma & cake day */}
              <UserInfoExtra<TCardUserInfoForm> isMe={isMe} user={user} control={control} onSubmitField={onChangeUserInfo} />
              <Divider sx={{ my: 1 }} />

              {/* User follower */}
              <UserInfoFollower user={user} />
            </CardContent>

            {/* Action buttons */}
            <UserButtons user={user} isMe={isMe} />
          </form>
        </>
      ) : (
        <RdSkeleton />
      )}
    </RdCard>
  )
}

export default CardUserInfo
