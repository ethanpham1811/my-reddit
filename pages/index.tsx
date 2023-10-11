import { CardAds, CardFeedSorter, CardHomeInfo, NewFeeds } from '@/components'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'
import usePostList from '@/hooks/usePostList'
import { Stack } from '@mui/material'

import { GetServerSidePropsContext, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  console.log(session)

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/login', // Redirect to the login page if the user is not authenticated
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: {
      user: {} // Pass the user object to your component
    }
  }
}

const Home: NextPage = () => {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const [postList, loading, error] = usePostList()
  const [hasNoPost, setHasNoPost] = useState(false)

  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <FeedLayout top="70px" sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
        <NewFeeds postList={postList} loading={loading} error={error} sortOptions={sortOptions} setHasNoPost={setHasNoPost} />
        <Stack spacing={2}>
          <CardAds />
          <CardHomeInfo />
        </Stack>
      </FeedLayout>
    </div>
  )
}
export default Home
