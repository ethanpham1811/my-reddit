'use client'
import { TAppSession } from '@/constants/types'
import useUserByEmail from '@/hooks/useUserByEmail'
import { Box } from '@mui/material'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
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
          <Toaster toastOptions={{ duration: 2000 }} position="bottom-right" />
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
