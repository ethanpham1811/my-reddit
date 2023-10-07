import { ORDERING, SORT_METHOD } from '@/constants/enums'
import { TSortOptions } from '@/constants/types'

import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const User: NextPage = () => {
  const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { userId }
  } = useRouter()

  // const [subredditData, loading] = useSubredditByName(subName)
  // const SubredditNewFeeds = withSubredditPostList(NewFeeds, subredditData?.id)

  return (
    <div>
      <Head>
        <title>u/{userId}</title>
      </Head>
      {/* <FeedLayout top="1rem" subredditId={subredditData?.id} sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <SubredditNewFeeds sortOptions={sortOptions} />
      </FeedLayout> */}
    </div>
  )
}

export default User
