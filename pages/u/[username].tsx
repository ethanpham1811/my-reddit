import { client } from '@/apollo-client'
import { CardFeedSorter, CardUserInfo, MessageBoard, NewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { ORDERING, QUERY_LIMIT, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TUserCompact, TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME_WITH_POSTS, GET_USER_LIST_SHORT } from '@/graphql/queries'
import useUserByUsername from '@/hooks/useUserByUsername'
import { validatePostByFollowing } from '@/services'
import { Stack } from '@mui/material'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

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
  const user: TUserDetail | null = res?.data?.userByUsername
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

  /* -------------------------------------User detail query--------------------------------------*/

  const { user, userPosts, loading: pageLoading, error = null, fetchMore } = useUserByUsername(username, svUser, svUserPosts)

  // redirect to 404 if no data found
  if (!pageLoading && (user == null || error)) {
    navigate('/404')
    return null
  }

  // if post belongs to my following OR this is my page => return true
  function verifyFollower(): boolean {
    return validatePostByFollowing(me?.following_ids, username) || me?.username === username
  }

  function permissionFailedMsg(): ReactNode | false {
    return !me?.username ? ( // if user is not logged in
      <MessageBoard head="You need to login to view their content" />
    ) : !verifyFollower() ? ( // if user is not following the user page
      <MessageBoard head="You need to follow " highlight={username as string} tail=" to view their posts" />
    ) : (
      false
    )
  }

  function fetchMoreUpdateReturn(
    prev: { [key: string]: { [key: string]: TPost[] } },
    fetchMoreResult: { [key: string]: { [key: string]: TPost[] } }
  ) {
    return !prev
      ? fetchMoreResult
      : {
          userByUsername: { ...prev?.userByUsername, post: [...prev?.userByUsername?.post, ...fetchMoreResult?.userByUsername?.post] }
        }
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
            fetchMoreUpdateReturn={fetchMoreUpdateReturn}
            permissionFailedMsg={permissionFailedMsg()}
            setHasNoPost={setHasNoPost}
          />
        </Stack>
        <CardUserInfo user={user} loading={pageLoading} />
      </FeedLayout>
    </div>
  )
}
