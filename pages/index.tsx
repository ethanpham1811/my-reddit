import { client } from '@/apollo-client'
import { CardAds, CardFeedSorter, CardHomeInfo, NewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, QUERY_LIMIT, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions } from '@/constants/types'
import { GET_PAGINATED_POST_LIST } from '@/graphql/queries'
import { usePostList } from '@/hooks'
import { Stack } from '@/mui'
import { appendHomePagePosts } from '@/src/pageFunctions'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useState } from 'react'

type THomePageProps = {
  postList: TPost[] | null
}

/* -----------------------------------ISG: UPDATE POST LIST - 5s REVALIDATE ------------------------------ */

export const getStaticProps = (async (ctx) => {
  let res
  try {
    res = await client.query({
      query: GET_PAGINATED_POST_LIST,
      variables: {
        offset: 0,
        limit: QUERY_LIMIT
      },
      fetchPolicy: 'no-cache'
    })
  } catch (error) {
    throw new Error(`Failed to fetch posts from server${error}`)
  }
  const postList: TPost[] | null = res?.data?.postPaginatedList

  return {
    props: {
      postList
    },
    revalidate: 1
  }
}) satisfies GetStaticProps<THomePageProps>

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function Home({ postList: svPostList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const [hasNoPost, setHasNoPost] = useState(false)
  const { postList, loading: pageLoading, error, fetchMore } = usePostList(svPostList)

  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>

      <FeedLayout top="70px" allowCreatePost>
        <Stack spacing={2}>
          <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
          <NewFeeds
            error={error}
            postList={postList}
            loading={pageLoading}
            sortOptions={sortOptions}
            permissionFailedMsg={false}
            noPostText="This page has no post"
            fetchMore={fetchMore}
            setHasNoPost={setHasNoPost}
            appendPosts={appendHomePagePosts}
          />
        </Stack>
        <Stack spacing={2}>
          <CardAds />
          <CardHomeInfo />
        </Stack>
      </FeedLayout>
    </div>
  )
}
