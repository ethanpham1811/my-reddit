import { useAppSession } from '@/src/Layouts/MainLayout'
import { SESSION_STATUS } from '@/src/constants/enums'
import { TUserDetail } from '@/src/constants/types'
import { useUserUpdate } from '@/src/hooks'
import { CardActions, Divider, useMediaQuery, useTheme } from '@/src/mui'
import { Events, eventEmitter } from '@/src/services/eventEmitter'
import { useState } from 'react'
import { RdButton } from '../../..'

type TUserButtonsProps = {
  user: TUserDetail | null
  isMe: boolean
}

function UserButtons({ user, isMe }: TUserButtonsProps) {
  const { session } = useAppSession()
  const status = session?.user?.role
  const me = session?.userDetail
  const { updateUser, loading } = useUserUpdate()
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [showUnfollowBtn, setShowUnfollowBtn] = useState(false)
  const isDisabled: boolean = !me || !me.member_of_ids || me?.member_of_ids?.length === 0

  /* onSubmit: add/remove follower from user's following_ids */
  async function handleFollowingAction(isUnfollow: boolean) {
    if (user && me) updateUser('following_ids', user.username, !isUnfollow)
  }

  /* fire event to open create post form */
  function onCreatePost() {
    eventEmitter.dispatch(Events.OPEN_CREATE_POST_FORM, true)
  }

  return (
    <>
      {status === SESSION_STATUS.Authenticated && (
        <>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <CardActions disableSpacing sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {!isMe ? (
              <>
                {user && me?.following_ids?.includes(user.username) ? (
                  <RdButton
                    disabled={loading}
                    onClick={() => handleFollowingAction(true)}
                    filled={isMobile || showUnfollowBtn}
                    text={isMobile || showUnfollowBtn ? 'Unfollow' : 'Following'}
                    onMouseEnter={() => !isMobile && setShowUnfollowBtn(true)}
                    onMouseLeave={() => !isMobile && setShowUnfollowBtn(false)}
                    color="blue"
                    sx={{ px: 3, py: 0.5, fontWeight: 700, fontSize: '0.8rem', width: { xs: '100%', sm: '30%', md: 'max-content' } }}
                  />
                ) : (
                  <RdButton
                    disabled={loading}
                    onClick={() => handleFollowingAction(false)}
                    text={'Follow'}
                    filled={!loading}
                    sx={{ width: { xs: '100%', sm: '30%', md: '100%' } }}
                    color="blue"
                    invertColor
                  />
                )}
              </>
            ) : (
              <>
                <RdButton
                  sx={{ width: { xs: '100%', sm: '30%', md: '100%' } }}
                  disabled={isDisabled}
                  onClick={onCreatePost}
                  text={'Create Post'}
                  filled={!isDisabled}
                  color="blue"
                  invertColor
                />
              </>
            )}
          </CardActions>
        </>
      )}
    </>
  )
}

export default UserButtons
