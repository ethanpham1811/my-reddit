import { LockIcon, PersonIcon, RemoveRedEyeIcon } from '@/src/constants/icons'
import { TCommunityTypeOPtions } from '@/src/constants/types'

export const groupTypeOptions: TCommunityTypeOPtions[] = [
  {
    label: 'Public',
    description: 'Anyone can view, post, and comment to this community',
    value: 'public',
    disabled: false,
    icon: PersonIcon
  },
  {
    label: 'Private',
    description: 'Only approved users can view and submit to this community',
    value: 'private',
    disabled: false,
    icon: LockIcon
  },
  {
    label: 'Restricted',
    description: 'Anyone can view this community, but only approved users can post',
    value: 'restricted',
    disabled: true,
    icon: RemoveRedEyeIcon
  }
]
