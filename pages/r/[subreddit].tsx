import { client } from '@/apollo-client'
import { CardFeedSorter, CardSubredditInfo, MessageBoard, NewFeeds, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { ORDERING, QUERY_LIMIT, SORT_METHOD, SUBREDDIT_TYPE } from '@/constants/enums'
import { TPost, TSortOptions, TSubreddit, TSubredditDetail } from '@/constants/types'
import { GET_SUBREDDIT_BY_NAME_WITH_POSTS, GET_SUBREDDIT_LIST_SHORT } from '@/graphql/queries'
import useSubByNameWithPosts from '@/hooks/useSubByNameWithPosts'
import { validateSubredditMember } from '@/services'
import { Stack } from '@mui/material'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

type TSubredditPageProps = {
  subreddit: TSubredditDetail | null
  subredditPosts: TPost[] | null
}

/* ---------------------------------ISG: UPDATE SUBREDDIT DETAIL - 5s REVALIDATE -------------------------- */

export const getStaticProps = (async ({ params }) => {
  let res = null
  try {
    res = await client.query({
      query: GET_SUBREDDIT_BY_NAME_WITH_POSTS,
      variables: { name: params?.subreddit, offset: 0, limit: QUERY_LIMIT },
      fetchPolicy: 'no-cache'
    })
  } catch (error) {
    throw new Error(`Failed to fetch subreddit detail from server`)
  }
  const subreddit: TSubredditDetail | null = res?.data?.subredditByNameWithPosts || null
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
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subName },
    push: navigate
  } = useRouter()
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const [hasNoPost, setHasNoPost] = useState(false)

  /* ------------------------------subreddit page info query-------------------------------------*/

  const { subreddit, subredditPosts, loading: pageLoading, error = null, fetchMore } = useSubByNameWithPosts(subName, svSubreddit, svSubredditPosts)

  // redirect to 404 if no data found
  if (!pageLoading && (subreddit == null || error)) {
    navigate('/404')
    return null
  }

  // weather if the post belongs to the public subreddit
  function verifyIsMember() {
    return validateSubredditMember(me?.member_of_ids, subName)
  }

  function permissionFailedMsg(): ReactNode | false {
    return subName && !verifyIsMember() && subreddit?.subType !== SUBREDDIT_TYPE.Public ? (
      <MessageBoard head="This community is private, please join " highlight={subName as string} />
    ) : (
      false
    )
  }

  function fetchMoreUpdateReturn(
    prev: { [key: string]: { [key: string]: TPost[] } },
    fetchMoreResult: { [key: string]: { [key: string]: TPost[] } }
  ) {
    return !prev
      ? fetchMoreResult
      : {
          subredditByNameWithPosts: {
            ...prev?.subredditByNameWithPosts,
            post: [...prev?.subredditByNameWithPosts?.post, ...fetchMoreResult?.subredditByNameWithPosts?.post]
          }
        }
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
            fetchMore={fetchMore}
            postList={subredditPosts}
            loading={pageLoading}
            error={error}
            sortOptions={sortOptions}
            noPostText="This subreddit has no post"
            fetchMoreUpdateReturn={fetchMoreUpdateReturn}
            permissionFailedMsg={permissionFailedMsg()}
            setHasNoPost={setHasNoPost}
          />
        </Stack>
        <CardSubredditInfo subreddit={subreddit} loading={pageLoading} />
      </FeedLayout>
    </div>
  )
}
