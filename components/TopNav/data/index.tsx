import { NOTI_BOX_NAME, PROFILE_DIALOG_TYPE } from '@/constants/enums'
import {
  AccountCircleOutlinedIcon,
  DarkModeOutlinedIcon,
  ErrorOutlineIcon,
  InfoOutlinedIcon,
  NotificationsOutlinedIcon,
  OutboundOutlinedIcon,
  PreviewOutlinedIcon,
  SmsOutlinedIcon
} from '@/constants/icons'
import { TIconBox, TProfileDropDownList } from '@/constants/types'

/* data tree for Notification Box */
export const notiData: TIconBox[] = [
  {
    icon: DarkModeOutlinedIcon,
    name: NOTI_BOX_NAME.Darkmode,
    tooltip: 'Dark mode',
    active: true
  },
  {
    icon: OutboundOutlinedIcon,
    name: NOTI_BOX_NAME.Popular,
    tooltip: 'Top trending posts',
    url: '/search',
    active: true
  },
  {
    icon: SmsOutlinedIcon,
    name: NOTI_BOX_NAME.Chat,
    notification: {
      content: 12,
      max: 99
    },
    hideOnMobile: true,
    tooltip: 'Work in progress'
  },
  {
    icon: NotificationsOutlinedIcon,
    name: NOTI_BOX_NAME.Notification,
    notification: {
      content: 999,
      max: 99
    },
    hideOnMobile: true,
    tooltip: 'Work in progress'
  },
  {
    icon: ErrorOutlineIcon,
    name: NOTI_BOX_NAME.Guide,
    hideOnMobile: true,
    tooltip: 'Quick user guide',
    active: true
  }
]

/* data tree for Profile Menu Dropdown */
export function buildProfileMenuData(username: string | undefined, options: { darkMode: boolean }): TProfileDropDownList[] {
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
      checked: options.darkMode,
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
