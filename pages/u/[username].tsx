import { client } from '@/apollo-client'
import { CardFeedSorter, CardUserInfo, NewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { ORDERING, QUERY_LIMIT, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TUserCompact, TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME_WITH_POSTS, GET_USER_LIST_SHORT } from '@/graphql/queries'
import { useUserByUsername } from '@/hooks'
import { Stack } from '@/mui'
import { appendPosts, noPermissionUserPageMsg } from '@/src/pageFunctions'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const [hasNoPost, setHasNoPost] = useState(false)

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
    <div>
      <Head>
        <title>u/{username}</title>
      </Head>
      <FeedLayout top="70px">
        <Stack spacing={2}>
          <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
          <NewFeeds
            fetchMore={fetchMore}
            postList={userPosts}
            loading={pageLoading}
            error={error}
            sortOptions={sortOptions}
            noPostText="This user has no post"
            appendPosts={appendPosts('userByUsernameWithPosts')}
            permissionFailedMsg={noPermissionUserPageMsg(me?.following_ids, me?.username, username)}
            setHasNoPost={setHasNoPost}
          />
        </Stack>
        <CardUserInfo user={user} loading={pageLoading} />
      </FeedLayout>
    </div>
  )
}
