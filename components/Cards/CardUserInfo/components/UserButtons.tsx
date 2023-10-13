import { AppContext } from '@/components/Layouts/MainLayout'
import { SESSION_STATUS } from '@/constants/enums'
import { SessionStatus, TUserDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import useUserByUsername from '@/hooks/useUserByUsername'
import { useMutation } from '@apollo/client'
import { CardActions, Divider } from '@mui/material'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { RdButton } from '../../..'

type TUserButtonsProps = {
  user: TUserDetail | null
  isMe: boolean
  status: SessionStatus | undefined
}

function UserButtons({ user, isMe, status }: TUserButtonsProps) {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  const [mutateFollowing] = useMutation(UPDATE_USER)
  const [showUnfollowBtn, setShowUnfollowBtn] = useState(false)

  /* onSubmit */
  async function handleFollowingAction(isUnfollow: boolean) {
    if (!user || !me) return
    let newValue: string[] = []

    if (isUnfollow) newValue = me.following_ids ? me.following_ids?.filter((follower) => follower !== user.username) : []
    else newValue = me.following_ids ? [...me.following_ids, user.username] : [user.username]

    const { errors } = await mutateFollowing({
      variables: {
        id: me.id,
        following_ids: newValue
      }
    })
    if (errors) toast.error(errors[0].message)
  }

  const onCreatePost = () => {}
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
                  <RdButton onClick={() => handleFollowingAction(false)} text={'Follow'} filled color="blue" invertColor />
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
