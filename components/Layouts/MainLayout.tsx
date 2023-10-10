import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import useSubredditList from '@/hooks/useSubredditList'
import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { TopNav } from '..'

export default function MainLayout({ children }: { children: ReactNode }) {
  const { data, status } = useSession()
  console.log(data, status)
  const router = useRouter()
  const subListData = useSubredditList(SUBREDDIT_LIST_MODE.Simple)

  // const childrenWithProps = Children.map(children, (child) => {
  //   if (!isValidElement<{ router: any }>(child)) return child
  //   return cloneElement(child, { router })
  // })
  return (
    <Box pb={5}>
      <TopNav subListData={subListData} session={{ data, status }} router={router} />
      <main>{children}</main>
      <Toaster position="bottom-right" />
    </Box>
  )
}
