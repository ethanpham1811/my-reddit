import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import useSubredditList from '@/hooks/useSubredditList'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { TopNav } from '..'

export default function MainLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  console.log(session)
  const router = useRouter()
  const subListData = useSubredditList(SUBREDDIT_LIST_MODE.Simple)

  // const childrenWithProps = Children.map(children, (child) => {
  //   if (!isValidElement<{ subListData: any }>(child)) return child
  //   return cloneElement(child, { subListData })
  // })
  return (
    <>
      <TopNav subListData={subListData} session={session} router={router} />
      <main>{children}</main>
      <Toaster />
    </>
  )
}
