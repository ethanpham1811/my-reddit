import { Events, eventEmitter } from '@/services/eventEmitter'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TUseCommunityDrawerResponse = [isDrawerOpened: boolean, setIsDrawerOpened: Dispatch<SetStateAction<boolean>>]

function useCommunityDrawer(): TUseCommunityDrawerResponse {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  /* Open drawer event listener  */
  useEffect(() => {
    eventEmitter.subscribe(Events.OPEN_CREATE_COMMUNITY_DRAWER, (value: boolean) => setIsDrawerOpened(value))
    return () => eventEmitter.unsubscribe(Events.OPEN_CREATE_COMMUNITY_DRAWER)
  }, [])

  return [isDrawerOpened, setIsDrawerOpened]
}

export default useCommunityDrawer
