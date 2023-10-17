import { client } from '@/apollo-client'
import { AppContext } from '@/components/Layouts/MainLayout'
import { SESSION_STATUS } from '@/constants/enums'
import { TSubredditDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { GET_USER_BY_EMAIL } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { CardActions, Divider } from '@mui/material'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { RdButton } from '../../..'

function SubredditButtons({ subreddit }: { subreddit: TSubredditDetail | null }) {
  const { session } = useContext(AppContext)
  const me = session?.userDetail
  const status = session?.user?.role
  const [mutateMemberOf] = useMutation(UPDATE_USER)

  /* onSubmit */
  async function onJoinCommunity() {
    if (!subreddit || !me) return
    const { errors } = await mutateMemberOf({
      variables: {
        id: me?.id,
        member_of_ids: me.member_of_ids ? [...me.member_of_ids, subreddit.name] : [subreddit.name]
      }
    })
    if (errors) toast.error(errors[0].message)

    // get cached data
    const cachedData = client.readQuery({ query: GET_USER_BY_EMAIL, variables: { username: me?.username } })
    if (!cachedData) return
    const userData = cachedData.userByUsername

    // updating subreddit page cache
    client.writeQuery({
      query: GET_USER_BY_EMAIL,
      data: {
        userByUsername: {
          ...userData,
          member_of_ids: userData.member_of_ids ? [...userData.member_of_ids, subreddit.name] : [subreddit.name]
        }
      },
      variables: { username: me?.username }
    })
  }

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
                  <RdButton onClick={onJoinCommunity} text={'Join community'} filled color="blue" invertColor />
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
