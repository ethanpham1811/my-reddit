import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { client } from '../apollo-client'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { createEmotionCache } from '../mui/createEmotionCache'
import { theme } from '../mui/theme'

const clientSideEmotionCache = createEmotionCache()

export interface TMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }: TMyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
            <Toaster />
          </SessionProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
