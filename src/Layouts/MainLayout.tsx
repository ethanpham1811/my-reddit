import { TAppSession } from '@/src/constants/types'
import { useUserDetailForSession } from '@/src/hooks'
import { Box } from '@/src/mui'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { TopNav } from '../components'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import DrawerCommunityWrapper from './components/DrawerCommunityWrapper'
import DrawerPremiumWrapper from './components/DrawerPremiumWrapper'
import { toastOptions } from './data'

export const AppContext = createContext<{ session: TAppSession; loading: boolean }>({
  session: null,
  loading: false
})

/**
 * With components:
 * - Session context (authentication status + user user detail)
 * - Top navigation
 * - Toaster
 * - Community creation drawer (lazy loaded)
 * - Premium registration drawer (lazy loaded)
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  const [appSession, loading, sessionUsername] = useUserDetailForSession()
  const [isAppLoading, setIsAppLoading] = useState(true)

  const ctx = useMemo(() => ({ session: appSession, loading }), [appSession, loading])

  /* splash screen */
  useEffect(() => {
    setIsAppLoading(false)
  }, [])

  return (
    <AppContext.Provider value={ctx}>
      {isAppLoading ? (
        <SplashScreen /> // Display the splash screen while loading
      ) : (
        <Box>
          {/* The only top navigation bar */}
          <TopNav sessionUsername={sessionUsername} />

          {/* Pages */}
          <main>{children}</main>

          {/* React hot toast */}
          <Toaster toastOptions={toastOptions} position="bottom-right" />

          {/* Right drawer (Community creation form) */}
          <DrawerCommunityWrapper />

          {/* Left drawer (Premium registration form) */}
          <DrawerPremiumWrapper />
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
