import { client } from '@/apollo-client'
import { AppContext } from '@/components/Layouts/MainLayout'
import { SESSION_STATUS } from '@/constants/enums'
import { TSession, TSubredditDetail } from '@/constants/types'
import { UPDATE_USER } from '@/graphql/mutations'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import useUserByUsername from '@/hooks/useUserByUsername'
import { useMutation } from '@apollo/client'
import { CardActions, Divider } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { RdButton } from '../../..'

function SubredditButtons({ subreddit }: { subreddit: TSubredditDetail | null }) {
  const { userName } = useContext(AppContext)
  const [me] = useUserByUsername(userName)
  const [mutateMemberOf] = useMutation(UPDATE_USER)
  const { status }: TSession = useSession()

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
    const cachedData = client.readQuery({ query: GET_USER_BY_USERNAME, variables: { username: userName } })
    if (!cachedData) return
    const userData = cachedData.userByUsername

    // updating subreddit page cache
    client.writeQuery({
      query: GET_USER_BY_USERNAME,
      data: {
        userByUsername: {
          ...userData,
          member_of_ids: userData.member_of_ids ? [...userData.member_of_ids, subreddit.name] : [subreddit.name]
        }
      },
      variables: { username: userName }
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
