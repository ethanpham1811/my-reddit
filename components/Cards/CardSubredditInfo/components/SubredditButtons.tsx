import { useAppSession } from '@/components/Layouts/MainLayout'
import { SESSION_STATUS } from '@/constants/enums'
import { ArrowForwardIcon } from '@/constants/icons'
import { TSubredditDetail } from '@/constants/types'
import useUserUpdate from '@/hooks/useUserUpdate'
import { Events, eventEmitter } from '@/src/eventEmitter'
import { CardActions, Divider } from '@mui/material'
import { useRouter } from 'next/router'
import { RdButton } from '../../..'

function SubredditButtons({ subreddit }: { subreddit: TSubredditDetail | null }) {
  const { session } = useAppSession()
  const {
    query: { subreddit: subName, postid },
    push: navigate
  } = useRouter()
  const me = session?.userDetail
  const status = session?.user?.role
  const { updateUser, loading } = useUserUpdate()

  /* Fire event to open creaet post form */
  function onClick() {
    if (postid) return navigate(`/r/${subName}`)
    subName && eventEmitter.dispatch(Events.OPEN_CREATE_POST_FORM, true)
  }

  return (
    <>
      {status === SESSION_STATUS.Authenticated && (
        <>
          <Divider />
          <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {status === SESSION_STATUS.Authenticated && (
              <>
                {subreddit && me?.member_of_ids?.includes(subreddit.name) ? (
                  <RdButton
                    endIcon={postid && <ArrowForwardIcon />}
                    onClick={onClick}
                    text={!postid ? 'Create Post' : (subName as string)}
                    filled
                    color="blue"
                    invertColor
                  />
                ) : (
                  <RdButton
                    disabled={loading}
                    onClick={() => updateUser('member_of_ids', subreddit?.name)}
                    text={'Join community'}
                    filled={!loading}
                    color="blue"
                    invertColor
                  />
                )}
              </>
            )}
          </CardActions>
        </>
      )}
    </>
  )
}

export default SubredditButtons
