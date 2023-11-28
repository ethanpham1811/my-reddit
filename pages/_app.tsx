import { MainLayout, MuiProvider } from '@/src/components'
import { createEmotionCache } from '@/src/mui/createEmotionCache'
import { ApolloProvider } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { __DEV__ } from '@apollo/client/utilities/globals'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider as SupabaseAuthProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { client } from '../src/services/apollo-client'

export interface TMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// emit apollo messages only in dev
if (__DEV__) {
  loadDevMessages()
  loadErrorMessages()
}

export default function App({ Component, emotionCache = createEmotionCache(), pageProps: { ...pageProps } }: TMyAppProps) {
  /* Init supabase client on app first render */
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1" />
      </Head>

      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, components: 'buttons', currency: 'USD' }}>
        <MuiProvider>
          <ApolloProvider client={client}>
            <SupabaseAuthProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </SupabaseAuthProvider>
          </ApolloProvider>
        </MuiProvider>
      </PayPalScriptProvider>
    </CacheProvider>
  )
}
