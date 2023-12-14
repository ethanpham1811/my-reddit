import FeedLayout from '@/src/Layouts/FeedLayout'
import { useAppSession } from '@/src/Layouts/MainLayout'
import { CardUserInfo, NewFeeds } from '@/src/components'
import { NON_SUB_FEED_LAYOUT_TOP_OFFSET, QUERY_LIMIT } from '@/src/constants/enums'
import { TPost, TUserCompact, TUserDetail } from '@/src/constants/types'
import { GET_USER_BY_USERNAME_WITH_POSTS, GET_USER_LIST_SHORT } from '@/src/graphql/queries'
import { useUserByUsername } from '@/src/hooks'
import { Box, Stack } from '@/src/mui'
import { client } from '@/src/services/apollo-client'
import { appendPosts, noPermissionUserPageMsg } from '@/src/services/pageFunctions'
import { generateUserCover } from '@/src/services/utils'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

type TUserPageProps = {
  user: TUserDetail | null
  userPosts: TPost[] | null
}

/* -----------------------------------ISG: UPDATE USER DETAIL - 5s REVALIDATE ---------------------------- */

export const getStaticProps = (async ({ params }) => {
  let res = null
  try {
    res = await client.query({
      query: GET_USER_BY_USERNAME_WITH_POSTS,
      variables: { username: params?.username, offset: 0, limit: QUERY_LIMIT },
      fetchPolicy: 'no-cache'
    })
  } catch (error) {
    throw new Error(`Failed to fetch user info from server`)
  }
  const user: TUserDetail | null = res?.data?.userByUsernameWithPosts
  const userPosts: TPost[] | null = user?.post || null

  return {
    props: {
      user,
      userPosts
    },
    revalidate: 1
  }
}) satisfies GetStaticProps<TUserPageProps>

/* ----------------------------------------------GENERATE STATIC PAGES ------------------------------------ */

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_USER_LIST_SHORT })
  const users: TUserCompact[] = data?.userList

  const paths = users.map((user) => ({
    params: { username: user.username }
  }))

  return { paths, fallback: true }
}

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function User({ user: svUser, userPosts: svUserPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { username },
    push: navigate
  } = useRouter()

  /**
   * Client side data fetching (to sync apollo cache between server & client)
   * redirect to 404 if no data found
   */
  const { user, userPosts, loading: pageLoading, error = null, fetchMore } = useUserByUsername(username, svUser, svUserPosts)
  if (!pageLoading && (user == null || error)) {
    navigate('/404')
    return null
  }

  return (
    <Box height="100dvh">
      <Head>
        <title>u/{username}</title>
      </Head>
      <FeedLayout
        top={NON_SUB_FEED_LAYOUT_TOP_OFFSET}
        allowCreatePost={username === me?.username.toString() ?? false}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Stack spacing={2}>
          <NewFeeds
            fetchMore={fetchMore}
            postList={userPosts}
            loading={pageLoading}
            error={error}
            noPostText="This user has no post"
            appendPosts={appendPosts('userByUsernameWithPosts')}
            permissionFailedMsg={noPermissionUserPageMsg(me?.following_ids, me?.username, username, true)}
          />
        </Stack>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <CardUserInfo user={user} loading={pageLoading} />
        </Stack>
      </FeedLayout>

      {/* user custom background (position fixed) */}
      <Box
        sx={{ backgroundImage: `url(${generateUserCover(user?.username, 2000, 1000, 7)})`, backgroundSize: 'cover' }}
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100dvh"
      />
    </Box>
  )
}
