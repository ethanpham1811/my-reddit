import { SEARCH_TABS } from '@/constants/enums'
import { TSearchTabBtn } from '@/constants/types'

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
