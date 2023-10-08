import { SEARCH_TABS } from '@/constants/enums'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Search: NextPage = () => {
  // const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { q, type }
  } = useRouter()
  const searchTerm = q ?? ''
  const tabKey = q ?? SEARCH_TABS.Post

  // console.log(searchTerm)
  // console.log(tabKey)

  return (
    <div>
      <Head>
        <title>Search reddit</title>
      </Head>
      {/* <FeedLayout top="1rem" subredditId={subredditData?.id} sortOptions={sortOptions} setSortOptions={setSortOptions}>
        <SubredditNewFeeds sortOptions={sortOptions} />
      </FeedLayout> */}
    </div>
  )
}

export default Search
