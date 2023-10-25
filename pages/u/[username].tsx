import { client } from '@/apollo-client'
import { CardFeedSorter, CardUserInfo, UserNewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import ISGFallBack from '@/components/utilities/ISGFallBack/ISGFallBack'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TUserCompact, TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME, GET_USER_LIST_SHORT } from '@/graphql/queries'
import useWaitingForISG from '@/hooks/useWaitingForISG'
import { useQuery } from '@apollo/client'
import { Stack } from '@mui/material'

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
      query: GET_USER_BY_USERNAME,
      variables: { username: params?.username },
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
  const [waitingForISG] = useWaitingForISG()
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { username },
    push: navigate
  } = useRouter()
  const [hasNoPost, setHasNoPost] = useState(false)

  /* -------------------------------------User detail query--------------------------------------*/

  const { data, loading, error = null } = useQuery(GET_USER_BY_USERNAME, { variables: { username } })
  const user: TUserDetail = data?.userByUsername || svUser
  const userPosts: TPost[] = user?.post || svUserPosts
  const pageLoading: boolean = loading && !user

  /* ---------------------show loading page on new created dynamic page--------------------------*/

  if (waitingForISG) return <ISGFallBack />

  /* ---------------------------------------------------------------------------------------------*/

  console.log(user, loading)

  // redirect to 404 if no data found
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
          <UserNewFeeds postList={userPosts} loading={pageLoading} error={error} sortOptions={sortOptions} setHasNoPost={setHasNoPost} />
        </Stack>
        <CardUserInfo user={user} loading={pageLoading} />
      </FeedLayout>
    </div>
  )
}
