import { NewPostForm, TopNav } from '@/components'
import { Container } from '@mui/material'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Reddit</title>
      </Head>
      <TopNav />
      <Container maxWidth="md" sx={{ paddingTop: '80px', '&.MuiContainer-root': { maxWidth: '1024px' } }}>
        <NewPostForm />
      </Container>
    </div>
  )
}
