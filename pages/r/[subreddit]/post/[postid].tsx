import { client } from '@/apollo-client'
import { CardPost, CardSubredditInfo, MessageBoard, SubredditTopNav } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import NewPageLoading from '@/components/utilities/NewPageLoading/NewPageLoading'
import { TPost, TSubredditDetail } from '@/constants/types'
import { GET_POST_AND_SUB_BY_POST_ID, GET_POST_LIST } from '@/graphql/queries'
import { validatePostBySubname } from '@/services'
import { ApolloError, useQuery } from '@apollo/client'
import { Stack } from '@mui/material'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

type TPostPageProps = {
  subreddit: TSubredditDetail
  subredditPost: TPost
  error: ApolloError | null
}

/* -----------------------------------ISG: UPDATE POST DETAIL - 5s REVALIDATE ---------------------------- */

export const getStaticProps = (async ({ params }) => {
  const { data, error = null } = await client.query({
    query: GET_POST_AND_SUB_BY_POST_ID,
    variables: { id: params?.postid, name: params?.subreddit },
    fetchPolicy: 'no-cache'
  })
  const subreddit: TSubredditDetail = data?.subredditByName
  const subredditPost: TPost = data?.post

  if (error) {
    throw new Error(`Failed to fetch posts, received status ${error.message}`)
  }

  return {
    props: {
      subreddit,
      subredditPost,
      error
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

export default function Post({ subreddit: svSubreddit, subredditPost: svSubredditPost }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subName, postid },
    push: navigate,
    isFallback
  } = useRouter()

  // post detail query
  const {
    data,
    loading,
    error = null
  } = useQuery(GET_POST_AND_SUB_BY_POST_ID, {
    variables: { id: postid, name: subName }
  })
  const subreddit: TSubredditDetail = data?.subredditByName || svSubreddit
  const post: TPost = data?.post || svSubredditPost
  const pageLoading: boolean = loading && !subreddit

  // redirect to 404 if no data found
  if (post === null && !pageLoading && !error) {
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
