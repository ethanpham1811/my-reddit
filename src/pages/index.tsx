import FeedLayout from '@/src/Layouts/FeedLayout'
import { CardAds, CardHomeInfo, NewFeeds } from '@/src/components'
import { NON_SUB_FEED_LAYOUT_TOP_OFFSET, QUERY_LIMIT } from '@/src/constants/enums'
import { TPost } from '@/src/constants/types'
import { GET_PAGINATED_POST_LIST } from '@/src/graphql/queries'
import { usePostList } from '@/src/hooks'
import { Stack } from '@/src/mui'
import { client } from '@/src/services/apollo-client'
import { appendHomePagePosts } from '@/src/services/pageFunctions'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

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
  const { postList, loading: pageLoading, error, fetchMore } = usePostList(svPostList)

  return (
    <>
      <Head>
        <title>My Reddit</title>
      </Head>

      <FeedLayout top={NON_SUB_FEED_LAYOUT_TOP_OFFSET} allowCreatePost>
        <Stack spacing={2}>
          <NewFeeds
            error={error}
            postList={postList}
            loading={pageLoading}
            permissionFailedMsg={false}
            noPostText="This page has no post"
            fetchMore={fetchMore}
            appendPosts={appendHomePagePosts}
          />
        </Stack>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <CardHomeInfo />
          <CardAds />
        </Stack>
      </FeedLayout>
    </>
  )
}
