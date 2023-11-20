import { TAppSession } from '@/src/constants/types'
import { useDrawer, useUserDetailForSession } from '@/src/hooks'
import { Box, useMediaQuery, useTheme } from '@/src/mui'
import { Events } from '@/src/services/eventEmitter'
import { ReactNode, Suspense, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { RdDrawer, TopNav } from '../components'
import { DrawerFallback } from '../components/Fallbacks'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import { lazyLoad } from '../services/lazyLoad'
import { toastOptions } from './data'

const CommunityCreator = lazyLoad('CommunityCreator', 'CommunityCreator')
const CardPayment = lazyLoad('Cards/CardPayment', 'CardPayment')

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
            <Suspense fallback={<DrawerFallback />}>{communityDrawerOpen && <CommunityCreator setOpen={setCommunityDrawerOpen} />}</Suspense>
          </RdDrawer>

          {/* Left drawer (Premium registration form) */}
          <RdDrawer disableScrollLock={!isMobile} anchor="left" open={premiumDrawerOpen} setOpen={setPremiumDrawerOpen}>
            <Suspense fallback={<DrawerFallback />}>{premiumDrawerOpen && <CardPayment setOpen={setPremiumDrawerOpen} />}</Suspense>
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
