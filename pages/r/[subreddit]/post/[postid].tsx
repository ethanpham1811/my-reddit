import { client } from '@/apollo-client'
import { CardPost, CardSubredditInfo, MessageBoard, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import NewPageLoading from '@/components/utilities/NewPageLoading/NewPageLoading'
import { TPost, TSubredditDetail } from '@/constants/types'
import { GET_POST_BY_ID, GET_POST_LIST, GET_SUBREDDIT_BY_NAME } from '@/graphql/queries'
import { validatePostBySubname } from '@/services'
import { ApolloError, useQuery } from '@apollo/client'
import { Stack } from '@mui/material'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

type TPostPageProps = {
  subreddit: TSubredditDetail
  post: TPost
  error: ApolloError | null
}

/* -----------------------------------ISG: UPDATE POST DETAIL - 5s REVALIDATE ---------------------------- */

export const getStaticProps = (async ({ params }) => {
  const { data: subData, error: subError = null } = await client.query({
    query: GET_SUBREDDIT_BY_NAME,
    variables: { name: params?.subreddit },
    fetchPolicy: 'no-cache'
  })
  const { data: postData, error: postError = null } = await client.query({
    query: GET_POST_BY_ID,
    variables: { id: params?.postid },
    fetchPolicy: 'no-cache'
  })
  const subreddit: TSubredditDetail = subData?.subredditByName
  const post: TPost = postData?.post

  if (subError || postError) throw new Error(`Failed to fetch data`)

  return {
    props: {
      subreddit,
      post,
      error: subError || postError
    },
    revalidate: 1
  }
}) satisfies GetStaticProps<TPostPageProps>

/* ----------------------------------------------GENERATE STATIC PAGES ------------------------------------ */

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_POST_LIST, fetchPolicy: 'no-cache' })
  const postList: TPost[] = data?.postList

  const paths = postList.map((post) => ({
    params: { subreddit: post?.subreddit?.name, postid: post.id }
  }))

  return { paths, fallback: 'blocking' }
}

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function Post({ subreddit: svSubreddit, post: svPost }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subName, postid },
    push: navigate,
    isFallback
  } = useRouter()

  /**
   * TODO:
   * This page temporarily using 2 queries as a workaround for a bug with cache update, fix this later
   */
  const {
    data: subData,
    loading: subLoading,
    error: subError = null
  } = useQuery(GET_SUBREDDIT_BY_NAME, {
    variables: { name: subName }
  })
  const {
    data: postData,
    loading: postLoading,
    error: postError = null
  } = useQuery(GET_POST_BY_ID, {
    variables: { id: postid }
  })
  /* ---------------------------------------------------------------------------------------------*/

  const subreddit: TSubredditDetail = subData?.subredditByName || svSubreddit
  const post: TPost = postData?.post || svPost
  const pageLoading: boolean = (subLoading || postLoading) && !subreddit

  // redirect to 404 if no data found
  if (post === null && !pageLoading && !subError && !postError) {
    navigate('/404')
    return null
  }

  // if post in public subreddit OR user is member of subreddit => return true
  const verifyPost = (): boolean => {
    return validatePostBySubname(me?.member_of_ids, subName, post?.subreddit?.subType)
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
        {!verifyPost() ? (
          <MessageBoard head={'This post is private, please join '} highlight={subName as string} />
        ) : (
          <Stack spacing={2}>{post && <CardPost post={post} loadedInSubPage={!!subName} loadedInPostPage={!!postid} />}</Stack>
        )}
        <CardSubredditInfo subreddit={subreddit} loading={pageLoading} />
      </FeedLayout>
    </div>
  )
}
