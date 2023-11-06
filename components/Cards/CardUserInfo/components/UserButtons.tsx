import { useAppSession } from '@/components/Layouts/MainLayout'
import { SESSION_STATUS } from '@/constants/enums'
import { TUserDetail } from '@/constants/types'
import { useUserUpdate } from '@/hooks'
import { CardActions, Divider } from '@/mui'
import { Events, eventEmitter } from '@/src/eventEmitter'
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
  const [showUnfollowBtn, setShowUnfollowBtn] = useState(false)

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
          <Divider sx={{ my: 1 }} />
          <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {!isMe ? (
              <>
                {user && me?.following_ids?.includes(user.username) ? (
                  <RdButton
                    disabled={loading}
                    onClick={() => handleFollowingAction(true)}
                    filled={showUnfollowBtn}
                    text={showUnfollowBtn ? 'Unfollow' : 'Following'}
                    onMouseEnter={() => setShowUnfollowBtn(true)}
                    onMouseLeave={() => setShowUnfollowBtn(false)}
                    color="blue"
                    width="6rem"
                    sx={{ px: 3, py: 0.5, fontWeight: 700, fontSize: '0.8rem' }}
                  />
                ) : (
                  <RdButton
                    disabled={loading}
                    onClick={() => handleFollowingAction(false)}
                    text={'Follow'}
                    filled={!loading}
                    color="blue"
                    invertColor
                  />
                )}
              </>
            ) : (
              <>
                <RdButton onClick={onCreatePost} text={'New Post'} filled color="blue" invertColor />
              </>
            )}
          </CardActions>
        </>
      )}
    </>
  )
}

export default UserButtons
