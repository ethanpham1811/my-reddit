import { SORT_METHOD } from '@/constants/enums'
import { LocalFireDepartmentIcon, TrendingUpOutlinedIcon, WbSunnyIcon } from '@/constants/icons'
import { TSorter } from '@/constants/types'

export const data: TSorter[] = [
  {
    icon: WbSunnyIcon,
    methodValue: SORT_METHOD.New,
    description: 'New posts',
    label: 'New',
    optionDisabled: false
  },
  {
    icon: LocalFireDepartmentIcon,
    methodValue: SORT_METHOD.Hot,
    description: 'Most upvoted',
    label: 'Hot',
    optionDisabled: false
  },
  {
    icon: TrendingUpOutlinedIcon,
    methodValue: SORT_METHOD.Rising,
    description: 'Top trending',
    label: 'Rising',
    optionDisabled: true
  }
]
