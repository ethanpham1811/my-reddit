import { NotFound } from '@/src/components/Cards/CardNotFound/CardNotFound'
import { Container } from '@/src/mui'

import Head from 'next/head'

const Page404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>

      <Container
        maxWidth="md"
        sx={{ height: '100dvh', width: '100vw', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <NotFound />
      </Container>
    </>
  )
}
export default Page404
