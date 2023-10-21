import { client } from '@/apollo-client'
import { CardFeedSorter, CardSubredditInfo, NewFeeds, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import NewPageLoading from '@/components/utilities/NewPageLoading/NewPageLoading'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TSubreddit, TSubredditDetail } from '@/constants/types'
import { GET_SUBREDDIT_BY_NAME, GET_SUBREDDIT_LIST_SHORT } from '@/graphql/queries'
import { ApolloError } from '@apollo/client'
import { Stack } from '@mui/material'

import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

type TSubredditPageProps = {
  subreddit: TSubredditDetail
  subredditPosts: TPost[]
  error: ApolloError | null
}

/* ---------------------------------ISG: UPDATE SUBREDDIT DETAIL - 5s REVALIDATE -------------------------- */

export const getStaticProps = (async ({ params }) => {
  const { data, error = null } = await client.query({ query: GET_SUBREDDIT_BY_NAME, variables: { name: params?.subreddit }, fetchPolicy: 'no-cache' })
  const subreddit: TSubredditDetail = data?.subredditByName
  const subredditPosts: TPost[] = subreddit?.post

  if (error) {
    throw new Error(`Failed to fetch posts, received status ${error.message}`)
  }

  return {
    props: {
      subreddit,
      subredditPosts,
      error
    },
    revalidate: 5
  }
}) satisfies GetStaticProps<TSubredditPageProps>

/* ----------------------------------------------GENERATE STATIC PAGES ------------------------------------ */

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_SUBREDDIT_LIST_SHORT })
  const subredditList: TSubreddit[] = data?.subredditList

  const paths = subredditList.map((subreddit) => ({
    params: { subreddit: subreddit.name }
  }))

  return { paths, fallback: true }
}

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function Subreddit({ subreddit, subredditPosts, error }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { subreddit: subName },
    push: navigate,
    isFallback
  } = useRouter()
  const [hasNoPost, setHasNoPost] = useState(false)
  const loading = false // FIXME: test loading

  // redirect to 404 if no data found
  if (subreddit === null && !loading && !error) {
    navigate('/404')
    return null
  }

  // show loading page on new created dynamic page
  if (isFallback) return <NewPageLoading />

  return (
    <div>
      <Head>
        <title>r/{subName}</title>
      </Head>
      <SubredditTopNav name={subreddit?.name} subType={subreddit?.subType} headline={subreddit?.headline} />
      <FeedLayout top="1rem" subredditId={subreddit?.id}>
        <Stack spacing={2}>
          <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
          <NewFeeds
            subType={subreddit?.subType}
            postList={subredditPosts}
            loading={loading}
            error={error}
            sortOptions={sortOptions}
            setHasNoPost={setHasNoPost}
          />
        </Stack>
        <CardSubredditInfo subreddit={subreddit} loading={loading} />
      </FeedLayout>
    </div>
  )
}
