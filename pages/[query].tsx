import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Search: NextPage = () => {
  // const [sortOptions, setSortOptions] = useState<TSortOptions>({ method: SORT_METHOD.New, ordering: ORDERING.Desc })
  const {
    query: { q, type }
  } = useRouter()

  console.log(q)

  return (
    <div>
      <Head>
        <title>Search reddit</title>
      </Head>
    </div>
  )
}

export default Search
