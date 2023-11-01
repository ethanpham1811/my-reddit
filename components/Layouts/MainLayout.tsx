import { CheckCircleIcon } from '@/constants/icons'
import { TAppSession } from '@/constants/types'
import useCommunityDrawer from '@/hooks/useCommunityDrawer'
import useUserDetailForSession from '@/hooks/useUserDetailForSession'
import { Box } from '@mui/material'
import { Jelly } from '@uiball/loaders'
import { ReactNode, createContext, useContext, useMemo } from 'react'
import { ErrorIcon, Toaster } from 'react-hot-toast'
import { CommunityCreator, RdDrawer, TopNav } from '..'

export const AppContext = createContext<{ session: TAppSession; loading: boolean }>({
  session: null,
  loading: false
})

export default function MainLayout({ children }: { children: ReactNode }) {
  const [appSession, loading, sessionUsername] = useUserDetailForSession()
  const [isDrawerOpened, setIsDrawerOpened] = useCommunityDrawer()
  const ctx = useMemo(() => ({ session: appSession, loading }), [appSession, loading])

  return (
    <AppContext.Provider value={ctx}>
      <Box>
        {/* The only top navigation bar */}
        <TopNav sessionUsername={sessionUsername} />

        {/* Pages */}
        <main>{children}</main>

        {/* React hot toast */}
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

        {/* Right drawer (Community creation form) */}
        <RdDrawer open={isDrawerOpened} setOpen={setIsDrawerOpened}>
          <CommunityCreator setOpen={setIsDrawerOpened} />
        </RdDrawer>
      </Box>
    </AppContext.Provider>
  )
}
/* retrieve ALL SESSION INFO with this hook */
export const useAppSession = () => {
  const context = useContext(AppContext)
  if (context === undefined) throw new Error('Context must be used within an AppProvider')
  return context
}
