import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, createContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { TopNav } from '..'

const defaultContext: { userName: string | null | undefined; userId: string | undefined } = { userName: undefined, userId: undefined }

export const AppContext = createContext(defaultContext)

export default function MainLayout({ children }: { children: ReactNode }) {
  const { data, status } = useSession()
  const router = useRouter()

  // const childrenWithProps = Children.map(children, (child) => {
  //   if (!isValidElement<{ router: any }>(child)) return child
  //   return cloneElement(child, { router })
  // })

  return (
    <AppContext.Provider value={{ userName: data?.user?.name, userId: data?.user?.id?.toString() }}>
      <Box>
        <TopNav session={{ data, status }} router={router} />
        <main>{children}</main>
        <Toaster position="bottom-right" />
      </Box>
    </AppContext.Provider>
  )
}
