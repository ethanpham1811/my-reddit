import { client } from '@/apollo-client'
import { CardFeedSorter, CardSubredditInfo, NewFeeds, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TPost, TSortOptions, TSubreddit, TSubredditDetail } from '@/constants/types'
import { GET_SUBREDDIT_BY_NAME, GET_SUBREDDIT_LIST_SHORT } from '@/graphql/queries'
import useWaitingForISG from '@/hooks/useWaitingForISG'
import { useQuery } from '@apollo/client'
import { Stack } from '@mui/material'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

type TSubredditPageProps = {
  subreddit: TSubredditDetail | null
  subredditPosts: TPost[] | null
}

/* ---------------------------------ISG: UPDATE SUBREDDIT DETAIL - 5s REVALIDATE -------------------------- */

export const getStaticProps = (async ({ params }) => {
  let res = null
  try {
    res = await client.query({ query: GET_SUBREDDIT_BY_NAME, variables: { name: params?.subreddit }, fetchPolicy: 'no-cache' })
  } catch (error) {
    throw new Error(`Failed to fetch subreddit detail from server`)
  }
  const subreddit: TSubredditDetail | null = res?.data?.subredditByName
  const subredditPosts: TPost[] | null = subreddit?.post || null

  return {
    props: {
      subreddit,
      subredditPosts
    },
    revalidate: 1
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

export default function Subreddit({ subreddit: svSubreddit, subredditPosts: svSubredditPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [waitingForISG] = useWaitingForISG()
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { subreddit: subName },
    push: navigate
  } = useRouter()
  const [hasNoPost, setHasNoPost] = useState(false)

  /* ------------------------------subreddit page info query-------------------------------------*/

  const { data, loading, error = null } = useQuery(GET_SUBREDDIT_BY_NAME, { variables: { name: subName } })
  const subreddit: TSubredditDetail = data?.subredditByName || svSubreddit
  const subredditPosts: TPost[] = subreddit?.post || svSubredditPosts
  const pageLoading: boolean = loading && !subreddit

  /* ---------------------show loading page on new created dynamic page--------------------------*/

  // if (waitingForISG) return <ISGFallBack />

  /* ---------------------------------------------------------------------------------------------*/

  // redirect to 404 if no data found
  if (!pageLoading && (subreddit == null || error)) {
    navigate('/404')
    return null
  }

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
            loading={pageLoading}
            error={error}
            sortOptions={sortOptions}
            setHasNoPost={setHasNoPost}
          />
        </Stack>
        <CardSubredditInfo subreddit={subreddit} loading={pageLoading} />
      </FeedLayout>
    </div>
  )
}
