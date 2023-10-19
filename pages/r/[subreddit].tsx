import { client } from '@/apollo-client'
import { CardFeedSorter, CardSubredditInfo, NewFeeds, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TSubredditDetail } from '@/constants/types'
import { GET_SUBREDDIT_BY_NAME } from '@/graphql/queries'
import { ApolloError } from '@apollo/client'
import { Stack } from '@mui/material'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

type TSubredditPageProps = {
  subreddit: TSubredditDetail
  subredditPosts: TPost[]
  error: ApolloError | null
}

export const getServerSideProps = (async ({ query: { subreddit: subName } }) => {
  const { data, error = null } = await client.query({ query: GET_SUBREDDIT_BY_NAME, variables: { name: subName } })
  const subreddit: TSubredditDetail = data?.subredditByName
  const subredditPosts: TPost[] = subreddit?.post

  return {
    props: {
      subreddit,
      subredditPosts,
      error
    }
  }
}) satisfies GetServerSideProps<TSubredditPageProps>

export default function Subreddit({ subreddit, subredditPosts, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { subreddit: subName },
    push: navigate
  } = useRouter()
  const [hasNoPost, setHasNoPost] = useState(false)
  const loading = false // FIXME: test loading

  // redirect to 404 if no data found
  subreddit === null && !loading && !error && navigate('/404')

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
