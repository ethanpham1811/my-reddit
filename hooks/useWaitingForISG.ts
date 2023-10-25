import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * This is a workaround for '"fallback=true' behaves like "fallback=blocking" when routing
 * Passively show "Loading page" on every routing
 * Move to App Router to get rid of this completely
 */
function useWaitingForISG(): boolean[] {
  const [waitingForISG, setWaitingForISG] = useState(false)
  const { events } = useRouter()

  async function checkIfStaticPageExists(route: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/checkStaticPage?route=${route}`)
      const data = await res.json()
      return data.exists
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    const handleRouteChange = async (url: string) => {
      const staticPageExists = await checkIfStaticPageExists(url)
      !staticPageExists && setWaitingForISG(true)
    }
    const handleRouteComplete = () => waitingForISG && setWaitingForISG(false)

    events.on('routeChangeStart', handleRouteChange)
    events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      events.off('routeChangeStart', handleRouteChange)
      events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [events, waitingForISG])

  return [waitingForISG]
}

export default useWaitingForISG
