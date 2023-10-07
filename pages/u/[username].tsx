import { CardUserInfo, NewFeeds } from '@/components'
import withUserPostList from '@/components/HOCs/withUserPostList'
import FeedLayout from '@/components/Layouts/FeedLayout'
import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'
import useUserByUsername from '@/hooks/useUserByUsername'

import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const User: NextPage = () => {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { username }
  } = useRouter()

  const [user, loading] = useUserByUsername(username)
  const SubredditNewFeeds = withUserPostList(NewFeeds, user?.id)

  return (
    <div>
      <Head>
        <title>u/{username}</title>
      </Head>
      <FeedLayout top="70px" sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <SubredditNewFeeds sortOptions={sortOptions} />
        <CardUserInfo user={user} loading={loading} />
      </FeedLayout>
    </div>
  )
}

export default User
