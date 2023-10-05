import { SUBREDDIT_LIST_MODE } from '@/constants/enums'
import useSubredditList from '@/hooks/useSubredditList'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { TopNav } from '..'

export default function MainLayout({ children }: { children: ReactNode }) {
  const subredditListData = useSubredditList(SUBREDDIT_LIST_MODE.Simple)

  // const childrenWithProps = Children.map(children, (child) => {
  //   if (!isValidElement<{ subredditListData: any }>(child)) return child
  //   return cloneElement(child, { subredditListData })
  // })
  return (
    <>
      <TopNav subredditListData={subredditListData} />
      <main>{children}</main>
      <Toaster />
    </>
  )
}
