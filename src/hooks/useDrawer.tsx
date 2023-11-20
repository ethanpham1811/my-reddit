import { Events, eventEmitter } from '@/src/services/eventEmitter'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TUseDrawerResponse = [isDrawerOpened: boolean, setIsDrawerOpened: Dispatch<SetStateAction<boolean>>]

function useDrawer(action: Events): TUseDrawerResponse {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  /* Open drawer event listener  */
  useEffect(() => {
    eventEmitter.subscribe(action, (value: unknown) => typeof value === 'boolean' && setIsDrawerOpened(value))
    return () => eventEmitter.unsubscribe(action)
  }, [action])

  return [isDrawerOpened, setIsDrawerOpened]
}

export default useDrawer
