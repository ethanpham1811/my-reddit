import { MainLayout } from '@/components'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { client } from '../apollo-client'
import { createEmotionCache } from '../mui/createEmotionCache'
import { theme } from '../mui/theme'
import '../styles/global.css'

const clientSideEmotionCache = createEmotionCache()

export interface TMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps: { ...pageProps } }: TMyAppProps) {
  // init supabase client on app first render
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </SessionContextProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
