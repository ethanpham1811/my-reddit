import { AppContext } from '@/components/Layouts/MainLayout'
import { SESSION_STATUS } from '@/constants/enums'
import { SessionStatus, TUserDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { CardActions, Divider } from '@mui/material'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { RdButton } from '../../..'

type TUserButtonsProps = {
  user: TUserDetail | null
  isMe: boolean
  status: SessionStatus | undefined
}

function UserButtons({ user, isMe, status }: TUserButtonsProps) {
  const { me } = useContext(AppContext)
  const [mutateFollowing] = useMutation(UPDATE_USER)

  /* onSubmit */
  async function onFollow() {
    if (!user || !me) return
    const { errors } = await mutateFollowing({
      variables: {
        id: me?.id,
        following_ids: me.following_ids ? [...me.following_ids, user.username] : [user.username]
      }
    })
    if (errors) {
      // setVoteCount(voteCount - (upvote ? 1 : -1)) // revert if mutation fails
      // TODO: optimistic - cache update
      toast.error(errors[0].message)
    }
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
                  <RdButton onClick={onFollow} text={'Followed'} color="blue" invertColor disabled />
                ) : (
                  <RdButton onClick={onFollow} text={'Follow'} filled color="blue" invertColor />
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
