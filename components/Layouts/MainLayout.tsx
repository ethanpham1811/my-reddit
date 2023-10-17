import { TAppSession } from '@/constants/types'
import useUserByEmail from '@/hooks/useUserByEmail'
import { Box } from '@mui/material'
import { Session, useSession } from '@supabase/auth-helpers-react'
import { ReactNode, createContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { TopNav } from '..'

export const AppContext = createContext<{ session: TAppSession }>({ session: null })

export default function MainLayout({ children }: { children: ReactNode }) {
  const session: Session | null = useSession()
  const [userDetail, _, loading] = useUserByEmail(session?.user?.email)
  const appSession: TAppSession = session ? { ...session, userDetail, loading } : null
  console.log(appSession)

  return (
    <AppContext.Provider value={{ session: appSession }}>
      <Box>
        <TopNav />
        <main>{children}</main>
        <Toaster position="bottom-right" />
      </Box>
    </AppContext.Provider>
  )
}

// const childrenWithProps = Children.map(children, (child) => {
//   if (!isValidElement<{ router: any }>(child)) return child
//   return cloneElement(child, { router })
// })
