import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { client } from '../apollo-client'

import { MainLayout } from '@/components'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SessionContextProvider as SupabaseSessionProvider } from '@supabase/auth-helpers-react'

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import Head from 'next/head'
import { useState } from 'react'
import { createEmotionCache } from '../mui/createEmotionCache'
import { theme } from '../mui/theme'
import '../styles/global.css'

const clientSideEmotionCache = createEmotionCache()

export interface TMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps: { ...pageProps } }: TMyAppProps) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_CLIENT_ANON_KEY
    })
  )

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <SupabaseSessionProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </SupabaseSessionProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
