'use client'
import { CheckCircleIcon } from '@/constants/icons'
import { TAppSession } from '@/constants/types'
import useUserByEmail from '@/hooks/useUserByEmail'
import { Box } from '@mui/material'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Jelly } from '@uiball/loaders'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ErrorIcon, Toaster } from 'react-hot-toast'
import { TopNav } from '..'
import SplashScreen from '../utilities/SplashScreen/SplashScreen'

export const AppContext = createContext<{ session: TAppSession; loading: boolean }>({
  session: null,
  loading: false
})

export default function MainLayout({ children }: { children: ReactNode }) {
  const supabase = useSupabaseClient()
  const [appSession, setAppSession] = useState<TAppSession>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userDetail, _, loading] = useUserByEmail(userEmail)
  const [isAppLoading, setIsAppLoading] = useState(true)

  /* update session on authentication (login/logout) */
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      // retrieve user email from supabase auth -> fetch data from this user by email
      session?.user?.email && setUserEmail(session.user.email)

      // append fetched userDetail to session
      setAppSession(session ? { ...session, userDetail } : null)
    })
    return () => subscription.unsubscribe()
  }, [supabase, userDetail])

  /* splash screen */
  useEffect(() => {
    setIsAppLoading(false)
  }, [])

  const ctx = useMemo(() => ({ session: appSession, loading }), [appSession, loading])

  return (
    <AppContext.Provider value={ctx}>
      {isAppLoading ? (
        <SplashScreen /> // Display the splash screen while loading
      ) : (
        <Box>
          <TopNav />
          <main>{children}</main>
          <Toaster
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#1A1A1B',
                fontSize: '0.8rem'
              },
              success: {
                icon: <CheckCircleIcon style={{ color: '#337d19' }} />
              },
              error: {
                icon: <ErrorIcon style={{ color: '#ff4500' }} />
              },
              loading: {
                icon: <Jelly size={20} speed={0.7} color="#ff4500" />
              }
            }}
            position="bottom-right"
          />
        </Box>
      )}
    </AppContext.Provider>
  )
}

/* retrieve ALL SESSION INFO with this hook */
export const useAppSession = () => {
  const context = useContext(AppContext)
  if (context === undefined) throw new Error('Context must be used within an AppProvider')
  return context
}

// const childrenWithProps = Children.map(children, (child) => {
//   if (!isValidElement<{ router: any }>(child)) return child
//   return cloneElement(child, { router })
// })
