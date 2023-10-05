import { NewFeeds } from '@/components'
import withPostList from '@/components/HOCs/withPostList'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'

import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const HomeNewFeeds = withPostList(NewFeeds)

  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <FeedLayout top="70px" sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <HomeNewFeeds sortOptions={sortOptions} />
      </FeedLayout>
    </div>
  )
}
export default Home
