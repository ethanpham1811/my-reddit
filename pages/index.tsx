import FeedLayout from '@/src/Layouts/FeedLayout'
import { CardAds, CardFeedSorter, CardHomeInfo, NewFeeds } from '@/src/components'
import { ORDERING, QUERY_LIMIT, SORT_METHOD } from '@/src/constants/enums'
import { TPost, TSortOptions } from '@/src/constants/types'
import { GET_PAGINATED_POST_LIST } from '@/src/graphql/queries'
import { usePostList } from '@/src/hooks'
import { Stack } from '@/src/mui'
import { client } from '@/src/services/apollo-client'
import { appendHomePagePosts } from '@/src/services/pageFunctions'

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
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <CardHomeInfo />
          <CardAds />
        </Stack>
      </FeedLayout>
    </div>
  )
}
