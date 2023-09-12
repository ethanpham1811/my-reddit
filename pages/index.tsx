import { PostWrapper, TopNav } from '@/components'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <TopNav></TopNav>
      <PostWrapper />
    </div>
  )
}
