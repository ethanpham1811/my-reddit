import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import { TUserDetail } from '@/constants/types'
import useSubredditList from '@/hooks/useSubredditList'
import useUserByUsername from '@/hooks/useUserByUsername'
import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, createContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { TopNav } from '..'

const defaultContext: { me: TUserDetail | null; meLoading: boolean } = { me: null, meLoading: true }

export const AppContext = createContext(defaultContext)

export default function MainLayout({ children }: { children: ReactNode }) {
  const { data, status } = useSession()
  const router = useRouter()
  const subListData = useSubredditList(SUBREDDIT_LIST_MODE.Simple)
  const [me, loading] = useUserByUsername(data?.user?.name)

  // const childrenWithProps = Children.map(children, (child) => {
  //   if (!isValidElement<{ router: any }>(child)) return child
  //   return cloneElement(child, { router })
  // })
  return (
    <AppContext.Provider value={{ me, meLoading: loading }}>
      <Box pb={5}>
        <TopNav subListData={subListData} session={{ data, status }} router={router} />
        <main>{children}</main>
        <Toaster position="bottom-right" />
      </Box>
    </AppContext.Provider>
  )
}
