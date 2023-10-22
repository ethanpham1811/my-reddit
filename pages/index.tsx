import { client } from '@/apollo-client'
import { CardAds, CardFeedSorter, CardHomeInfo, NewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions } from '@/constants/types'
import { GET_POST_LIST } from '@/graphql/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { Stack } from '@mui/material'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useState } from 'react'

type THomePageProps = {
  postList: TPost[]
  error: ApolloError | null
}

/* -----------------------------------ISG: UPDATE POST LIST - 5s REVALIDATE ------------------------------ */

export const getStaticProps = (async (ctx) => {
  const { data, error = null } = await client.query({ query: GET_POST_LIST, fetchPolicy: 'no-cache' })
  const postList: TPost[] = data?.postList

  if (error) {
    throw new Error(`Failed to fetch posts, received status ${error.message}`)
  }

  return {
    props: {
      postList,
      error
    },
    revalidate: 1
  }
}) satisfies GetStaticProps<THomePageProps>

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function Home({ postList: svPostList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const [hasNoPost, setHasNoPost] = useState(false)

  // home page posts list query
  const { data, loading, error } = useQuery(GET_POST_LIST)
  const postList: TPost[] = data?.postList || svPostList
  const pageLoading: boolean = loading && !postList

  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>

      <FeedLayout top="70px">
        <Stack spacing={2}>
          <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
          <NewFeeds postList={postList} loading={pageLoading} error={error} sortOptions={sortOptions} setHasNoPost={setHasNoPost} />
        </Stack>
        <Stack spacing={2}>
          <CardAds />
          <CardHomeInfo />
        </Stack>
      </FeedLayout>
    </div>
  )
}
