import { MainLayout } from '@/components'
import MuiLayout from '@/components/Layouts/MuiLayout'
import { createEmotionCache } from '@/mui/createEmotionCache'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { client } from '../apollo-client'
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

      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, components: 'buttons', currency: 'USD' }}>
        <MuiLayout>
          <ApolloProvider client={client}>
            <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </SessionContextProvider>
          </ApolloProvider>
        </MuiLayout>
      </PayPalScriptProvider>
    </CacheProvider>
  )
}
