import TopNav from '@/components/TopNav'
import Head from 'next/head'

export default function Page() {
  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <h1>Hello this is my Reddit</h1>
      <TopNav></TopNav>
    </div>
  )
}
