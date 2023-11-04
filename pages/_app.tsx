import { MainLayout } from '@/components'
import MuiLayout from '@/components/Layouts/MuiLayout'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { client } from '../apollo-client'
import { createEmotionCache } from '../mui/createEmotionCache'
import '../styles/global.css'

export interface TMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// Dark-light mode context

export default function App({ Component, emotionCache = createEmotionCache(), pageProps: { ...pageProps } }: TMyAppProps) {
  /* Init supabase client on app first render */
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1" />
      </Head>

      <MuiLayout>
        <ApolloProvider client={client}>
          <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </SessionContextProvider>
        </ApolloProvider>
      </MuiLayout>
    </CacheProvider>
  )
}
