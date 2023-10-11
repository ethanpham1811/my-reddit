import { CardFeedSorter, CardUserInfo, UserNewFeeds } from '@/components'
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
  const [user, userPosts, loading, error] = useUserByUsername(username)
  const [hasNoPost, setHasNoPost] = useState(false)

  return (
    <div>
      <Head>
        <title>u/{username}</title>
      </Head>
      <FeedLayout top="70px" sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <CardFeedSorter disabled={hasNoPost} sortOptions={sortOptions} setSortOptions={setSortOptions} />
        <UserNewFeeds postList={userPosts} loading={loading} error={error} sortOptions={sortOptions} setHasNoPost={setHasNoPost} />
        <CardUserInfo user={user} loading={loading} />
      </FeedLayout>
    </div>
  )
}

export default User
