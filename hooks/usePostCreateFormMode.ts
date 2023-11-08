import { TEditModePayload } from '@/constants/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type TUseHook = [isLinkPost: boolean, setIsLinkPost: Dispatch<SetStateAction<boolean>>]

function usePostCreateFormMode(editModePayload: TEditModePayload | undefined): TUseHook {
  const [isLinkPost, setIsLinkPost] = useState(false)

  /* set link post mode if eligible */
  useEffect(() => {
    editModePayload?.link && setIsLinkPost(true)
  }, [setIsLinkPost, editModePayload])

  return [isLinkPost, setIsLinkPost]
}

export default usePostCreateFormMode
