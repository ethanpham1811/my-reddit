import { client } from '@/apollo-client'
import { CardAds, CardFeedSorter, CardHomeInfo, NewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions } from '@/constants/types'
import { GET_POST_LIST } from '@/graphql/queries'
import { ApolloError } from '@apollo/client'
import { Stack } from '@mui/material'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useState } from 'react'

type THomePageProps = {
  postList: TPost[]
  error: ApolloError | null
}

export const getServerSideProps = (async (ctx) => {
  const { data, error = null } = await client.query({ query: GET_POST_LIST })
  const postList: TPost[] = data?.postList

  return {
    props: {
      postList,
      error
    }
  }
}) satisfies GetServerSideProps<THomePageProps>

export default function Home({ postList, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const [hasNoPost, setHasNoPost] = useState(false)

  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <FeedLayout top="70px">
        <Stack spacing={2}>
          <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
          <NewFeeds postList={postList} loading={false} error={error} sortOptions={sortOptions} setHasNoPost={setHasNoPost} />
        </Stack>
        <Stack spacing={2}>
          <CardAds />
          <CardHomeInfo />
        </Stack>
      </FeedLayout>
    </div>
  )
}
