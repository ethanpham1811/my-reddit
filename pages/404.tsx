import { NotFound } from '@/components/Cards/CardNotFound/CardNotFound'
import { Container } from '@/mui'

import Head from 'next/head'

const Page404 = () => {
  return (
    <div>
      <Head>
        <title>404 - Page not found</title>
      </Head>

      <Container
        maxWidth="md"
        sx={{ height: '100vh', width: '100vw', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <NotFound />
      </Container>
    </div>
  )
}
export default Page404

// export async function getServerSideProps({ res }) {
//   res.writeHead(302, { Location: '/' })
//   res.end()

//   return {
//     props: {} // Empty props since the component won't be rendered.
//   }
// }

// if (!data) {
//   return {
//     notFound: true,
//   }
// }
