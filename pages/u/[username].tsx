import { client } from '@/apollo-client'
import { CardFeedSorter, CardUserInfo, UserNewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import NewPageLoading from '@/components/utilities/NewPageLoading/NewPageLoading'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TUserCompact, TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME, GET_USER_LIST_SHORT } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { Stack } from '@mui/material'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

type TUserPageProps = {
  user: TUserDetail
  userPosts: TPost[]
  error: ApolloError | null
}

/* -----------------------------------ISG: UPDATE USER DETAIL - 5s REVALIDATE ---------------------------- */

export const getStaticProps = (async ({ params }) => {
  const { data, error = null } = await client.query({
    query: GET_USER_BY_USERNAME,
    variables: { username: params?.username },
    fetchPolicy: 'no-cache'
  })
  const user: TUserDetail = data?.userByUsername
  const userPosts: TPost[] = user?.post

  if (error) {
    throw new Error(`Failed to fetch posts, received status ${error.message}`)
  }

  return {
    props: {
      user,
      userPosts,
      error
    },
    revalidate: 5
  }
}) satisfies GetStaticProps<TUserPageProps>

/* ----------------------------------------------GENERATE STATIC PAGES ------------------------------------ */

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_USER_LIST_SHORT })
  const users: TUserCompact[] = data?.userList

  const paths = users.map((user) => ({
    params: { username: user.username }
  }))

  return { paths, fallback: 'blocking' }
}

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function User() {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { username },
    push: navigate,
    isFallback
  } = useRouter()
  const [hasNoPost, setHasNoPost] = useState(false)

  // user detail query
  const { data, loading, error = null } = useQuery(GET_USER_BY_USERNAME, { variables: { username } })
  const user: TUserDetail = data?.userByUsername
  const userPosts: TPost[] = user?.post

  // redirect to 404 if no data found
  if (user === null && !loading && !error) {
    navigate('/404')
    return null
  }

  // show loading page on new created dynamic page
  if (isFallback) return <NewPageLoading />

  return (
    <div>
      <Head>
        <title>u/{username}</title>
      </Head>
      <FeedLayout top="70px">
        <Stack spacing={2}>
          <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
          <UserNewFeeds postList={userPosts} loading={loading} error={error} sortOptions={sortOptions} setHasNoPost={setHasNoPost} />
        </Stack>
        <CardUserInfo user={user} loading={loading} />
      </FeedLayout>
    </div>
  )
}
