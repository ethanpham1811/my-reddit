import { TAppSession } from '@/src/constants/types'
import { useDrawer, useUserDetailForSession } from '@/src/hooks'
import { Box, useMediaQuery, useTheme } from '@/src/mui'
import { Events } from '@/src/services/eventEmitter'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { CommunityCreator, RdDrawer, TopNav } from '../components'
import CardPayment from '../components/Cards/CardPayment/CardPayment'
import SplashScreen from '../components/SplashScreen/SplashScreen'
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
 * - Community creation drawer
 * - Premium registration drawer
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  const [appSession, loading, sessionUsername] = useUserDetailForSession()
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [communityDrawerOpen, setCommunityDrawerOpen] = useDrawer(Events.OPEN_CREATE_COMMUNITY_DRAWER)
  const [premiumDrawerOpen, setPremiumDrawerOpen] = useDrawer(Events.OPEN_PREMIUM_DRAWER)

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
          <RdDrawer disableScrollLock={!isMobile} anchor="right" open={communityDrawerOpen} setOpen={setCommunityDrawerOpen}>
            <CommunityCreator setOpen={setCommunityDrawerOpen} />
          </RdDrawer>

          {/* Left drawer (Premium registration form) */}
          <RdDrawer disableScrollLock={!isMobile} anchor="left" open={premiumDrawerOpen} setOpen={setPremiumDrawerOpen}>
            <CardPayment setOpen={setPremiumDrawerOpen} />
          </RdDrawer>
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
