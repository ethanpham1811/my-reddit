import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { client } from '../apollo-client'

import { MainLayout } from '@/components'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createClient } from '@supabase/supabase-js'
import Head from 'next/head'
import { createEmotionCache } from '../mui/createEmotionCache'
import { theme } from '../mui/theme'
import '../styles/global.css'

const clientSideEmotionCache = createEmotionCache()

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_CLIENT_ANON_KEY ?? '')

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
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </SessionProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
