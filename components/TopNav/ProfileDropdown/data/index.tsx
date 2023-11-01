import { PROFILE_DIALOG_TYPE } from '@/constants/enums'
import { AccountCircleOutlinedIcon, InfoOutlinedIcon, PreviewOutlinedIcon } from '@/constants/icons'
import { TProfileDropDownList } from '@/constants/types'

export function buildMenuData(username: string | undefined): TProfileDropDownList[] {
  return [
    {
      name: 'Profile',
      value: 'profile',
      url: `/u/${username || ''}`,
      disabled: !username,
      groupBy: 'My Space',
      groupIcon: AccountCircleOutlinedIcon
    },
    {
      name: 'Create community',
      value: 'createCommunity',
      disabled: !username,
      groupBy: 'My Space',
      onClick: true,
      groupIcon: AccountCircleOutlinedIcon
    },
    {
      name: 'Online Status',
      value: 'status',
      switcher: true,
      groupBy: 'My Space',
      disabled: true,
      groupIcon: AccountCircleOutlinedIcon
    },
    {
      name: 'Dark Mode',
      value: 'mode',
      switcher: true,
      groupBy: 'View Options',
      disabled: true,
      groupIcon: PreviewOutlinedIcon
    },
    {
      name: 'User Agreement',
      value: 'User Agreement',
      groupBy: 'Terms & Policies',
      dialog: PROFILE_DIALOG_TYPE.UserAgreement,
      groupIcon: InfoOutlinedIcon
    }
  ]
}
