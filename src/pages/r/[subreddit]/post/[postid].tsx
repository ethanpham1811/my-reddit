import FeedLayout from '@/src/Layouts/FeedLayout'
import { useAppSession } from '@/src/Layouts/MainLayout'
import { CardPost, CardSubredditInfo, RdMessageBoard, SubredditTopNav } from '@/src/components'
import ZoomImgDialog from '@/src/components/Cards/CardPost/components/ZoomImgDialog'
import { TPost, TSubredditDetail } from '@/src/constants/types'
import { GET_POST_BY_ID, GET_POST_LIST, GET_SUBREDDIT_BY_NAME } from '@/src/graphql/queries'
import { useSubByNameAndPostById } from '@/src/hooks'
import { Stack } from '@/src/mui'
import { client } from '@/src/services/apollo-client'
import { validatePostBySubname } from '@/src/services/utils'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

type TPostPageProps = {
  subreddit: TSubredditDetail | null
  post: TPost | null
}

/* -----------------------------------ISG: UPDATE POST DETAIL - 5s REVALIDATE ---------------------------- */

export const getStaticProps = (async ({ params }) => {
  let resSub = null
  let resPost = null
  try {
    resSub = await client.query({
      query: GET_SUBREDDIT_BY_NAME,
      variables: { name: params?.subreddit },
      fetchPolicy: 'no-cache'
    })
    resPost = await client.query({
      query: GET_POST_BY_ID,
      variables: { id: params?.postid },
      fetchPolicy: 'no-cache'
    })
  } catch (error) {
    throw new Error(`Failed to fetch post data from server`)
  }

  const subreddit: TSubredditDetail | null = resSub?.data?.subredditByName
  const post: TPost | null = resPost?.data?.post

  return {
    props: {
      subreddit,
      post
    },
    revalidate: 1
  }
}) satisfies GetStaticProps<TPostPageProps>

/* ----------------------------------------------GENERATE STATIC PAGES ------------------------------------ */

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_POST_LIST, fetchPolicy: 'no-cache' })
  const postList: TPost[] = data?.postList

  const paths = postList.map((post) => ({
    params: { subreddit: post?.subreddit?.name, postid: post?.id }
  }))

  return { paths, fallback: true }
}

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function Post({ subreddit: svSubreddit, post: svPost }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subName, editing },
    push: navigate
  } = useRouter()

  /**
   * Client side data fetching (to sync apollo cache between server & client)
   * redirect to 404 if no data found
   */
  const { subreddit, postDetail, loading: pageLoading, error } = useSubByNameAndPostById(svSubreddit, svPost)
  if (!pageLoading && (postDetail == null || subreddit == null || error)) {
    navigate('/404')
    return null
  }

  // edit page: redirect to home if user not logged in
  if (!session && editing === 'true') {
    navigate('/')
    return null
  }

  // if post in public subreddit OR user is member of subreddit => return true
  const verifyPost = (): boolean => {
    return me?.username === postDetail?.user?.username || validatePostBySubname(me?.member_of_ids, subName, postDetail?.subreddit?.subType)
  }

  return (
    <>
      <Head>
        <title>r/{subName}</title>
      </Head>
      <SubredditTopNav subreddit={subreddit} owner={subreddit?.user?.username} />
      <FeedLayout top="1rem" subredditId={subreddit?.id} loading={pageLoading}>
        {!verifyPost() ? (
          <RdMessageBoard
            head={`This post is private, please ${me ? 'join' : ''} `}
            highlight={!me ? 'login' : (subName as string)}
            tail={!me ? ` and join the ${subName as string}` : undefined}
            hasLogin={!me}
          />
        ) : (
          <Stack spacing={2}>
            {postDetail && (
              <>
                <CardPost post={postDetail} />

                {/* dialog show zoomed image */}
                <ZoomImgDialog />
              </>
            )}
          </Stack>
        )}
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <CardSubredditInfo subreddit={subreddit} loading={pageLoading} />
        </Stack>
      </FeedLayout>
    </>
  )
}
