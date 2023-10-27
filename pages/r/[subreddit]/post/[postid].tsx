import { client } from '@/apollo-client'
import { CardPost, CardSubredditInfo, MessageBoard, SubredditTopNav } from '@/components'
import ZoomImgDialog from '@/components/Cards/CardPost/components/ZoomImgDialog'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { useAppSession } from '@/components/Layouts/MainLayout'
import ISGFallBack from '@/components/utilities/ISGFallBack/ISGFallBack'
import { TPost, TSubredditDetail } from '@/constants/types'
import { GET_POST_BY_ID, GET_POST_LIST, GET_SUBREDDIT_BY_NAME } from '@/graphql/queries'
import useWaitingForISG from '@/hooks/useWaitingForISG'
import { validatePostBySubname } from '@/services'
import { useQuery } from '@apollo/client'
import { Stack } from '@mui/material'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
    params: { subreddit: post?.subreddit?.name, postid: post.id }
  }))

  return { paths, fallback: true }
}

/* -----------------------------------------------------PAGE------------------------------------------------ */

export default function Post({ subreddit: svSubreddit, post: svPost }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [waitingForISG] = useWaitingForISG()
  const { session } = useAppSession()
  const me = session?.userDetail
  const {
    query: { subreddit: subName, postid },
    push: navigate
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
  const pageLoading: boolean = (subLoading || postLoading) && !subreddit && !post
  // zoom image dialog states
  const [zoomedImg, setZoomedImg] = useState<string | null>(null)

  /* ---------------------show loading page on new created dynamic page--------------------------*/

  if (waitingForISG) return <ISGFallBack />

  /* ---------------------------------------------------------------------------------------------*/

  // redirect to 404 if no data found
  if (!pageLoading && (post == null || subreddit == null || subError || postError)) {
    navigate('/404')
    return null
  }

  // if post in public subreddit OR user is member of subreddit => return true
  const verifyPost = (): boolean => {
    return me?.id === post?.user?.id || validatePostBySubname(me?.member_of_ids, subName, post?.subreddit?.subType)
  }

  return (
    <div>
      <Head>
        <title>r/{subName}</title>
      </Head>
      <SubredditTopNav name={subreddit?.name} subType={subreddit?.subType} headline={subreddit?.headline} />
      <FeedLayout top="1rem" subredditId={subreddit?.id} loading={pageLoading}>
        {!verifyPost() ? (
          <MessageBoard head={'This post is private, please join '} highlight={subName as string} />
        ) : (
          <Stack spacing={2}>
            {post && (
              <>
                <CardPost post={post} setZoomedImg={setZoomedImg} />

                {/* dialog show zoomed image */}
                <ZoomImgDialog zoomDialogOpen={zoomedImg} setZoomDialogOpen={setZoomedImg} />
              </>
            )}
          </Stack>
        )}
        <CardSubredditInfo subreddit={subreddit} loading={pageLoading} />
      </FeedLayout>
    </div>
  )
}
