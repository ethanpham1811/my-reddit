import { SEARCH_TABS } from '@/src/constants/enums'
import { TSearchTabBtn } from '@/src/constants/types'

export const tabList: TSearchTabBtn[] = [
  {
    value: SEARCH_TABS.Post,
    title: 'Posts'
  },
  {
    value: SEARCH_TABS.Communities,
    title: 'Communities'
  },
  {
    value: SEARCH_TABS.People,
    title: 'People'
  }
]
