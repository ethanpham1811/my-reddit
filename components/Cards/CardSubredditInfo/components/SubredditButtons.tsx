import { useAppSession } from '@/components/Layouts/MainLayout'
import { SESSION_STATUS } from '@/constants/enums'
import { TSubredditDetail } from '@/constants/types'
import useUpdateUser from '@/hooks/useUpdateUser'
import { CardActions, Divider } from '@mui/material'
import { RdButton } from '../../..'

function SubredditButtons({ subreddit }: { subreddit: TSubredditDetail | null }) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const status = session?.user?.role
  const { updateUser, loading } = useUpdateUser()

  /* onSubmit */
  const onCreatePost = () => {}

  return (
    <>
      {status === SESSION_STATUS.Authenticated && (
        <>
          <Divider />
          <CardActions disableSpacing sx={{ p: 0, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {status === SESSION_STATUS.Authenticated && (
              <>
                {subreddit && me?.member_of_ids?.includes(subreddit.name) ? (
                  <RdButton onClick={onCreatePost} text={'Create Post'} filled color="blue" invertColor />
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
