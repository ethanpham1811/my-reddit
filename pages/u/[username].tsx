import { client } from '@/apollo-client'
import { CardFeedSorter, CardUserInfo, UserNewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TUserDetail } from '@/constants/types'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { ApolloError } from '@apollo/client'
import { Stack } from '@mui/material'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

type TUserPageProps = {
  user: TUserDetail
  userPosts: TPost[]
  error: ApolloError | null
}

export const getServerSideProps = (async ({ query: { username } }) => {
  const { data, error = null } = await client.query({ query: GET_USER_BY_USERNAME, variables: { username } })
  const user: TUserDetail = data?.userByUsername
  const userPosts: TPost[] = user?.post

  return {
    props: {
      user,
      userPosts,
      error
    }
  }
}) satisfies GetServerSideProps<TUserPageProps>

export default function User({ user, userPosts, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { username },
    push: navigate
  } = useRouter()
  const [hasNoPost, setHasNoPost] = useState(false)
  const loading = false // FIXME: test loading

  // redirect to 404 if no data found
  user === null && !loading && !error && navigate('/404')

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
