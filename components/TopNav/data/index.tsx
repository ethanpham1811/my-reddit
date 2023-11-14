import { NOTI_BOX_NAME, PROFILE_DIALOG_TYPE, PROFILE_MENU_OPTION_TYPE, PROFILE_MENU_OPTION_VALUE } from '@/constants/enums'
import {
  AccountCircleOutlinedIcon,
  DarkModeOutlinedIcon,
  ErrorOutlineIcon,
  InfoOutlinedIcon,
  NotificationsOutlinedIcon,
  OutboundOutlinedIcon,
  PreviewOutlinedIcon,
  StarsIcon
} from '@/constants/icons'
import { TIconBox, TProfileDropDownList, TUserDetail } from '@/constants/types'
import { Dispatch, SetStateAction } from 'react'

type TBuildDataProps = {
  me: TUserDetail | null | undefined
  toggleDarkMode: () => void
  openPremiumDrawer: () => void
  setUserGuideOpen: Dispatch<SetStateAction<boolean>>
  navigate: (url: string) => Promise<boolean>
}

/* data tree for Notification Box */
export const buildData = ({ me, toggleDarkMode, openPremiumDrawer, setUserGuideOpen, navigate }: TBuildDataProps): TIconBox[] => [
  {
    icon: DarkModeOutlinedIcon,
    name: NOTI_BOX_NAME.Darkmode,
    tooltip: 'Dark mode',
    onClick: toggleDarkMode
  },
  {
    icon: StarsIcon,
    name: NOTI_BOX_NAME.Premium,
    tooltip: 'Premium subscription',
    hideOnMobile: true,
    disabled: !me,
    onClick: openPremiumDrawer
  },
  {
    icon: NotificationsOutlinedIcon,
    name: NOTI_BOX_NAME.Notification,
    notification: {
      content: 999,
      max: 99
    },
    hideOnMobile: true,
    tooltip: 'Work in progress',
    disabled: true,
    onClick: () => {}
  },
  {
    icon: OutboundOutlinedIcon,
    name: NOTI_BOX_NAME.Popular,
    tooltip: 'Top trending posts',
    onClick: () => navigate('/search')
  },
  {
    icon: ErrorOutlineIcon,
    name: NOTI_BOX_NAME.Guide,
    hideOnMobile: true,
    tooltip: 'Quick user guide',
    onClick: () => setUserGuideOpen(true)
  }
]

/* data tree for Profile Menu Dropdown */
export function buildProfileMenuData(username: string | undefined, options: { darkMode: boolean }): TProfileDropDownList[] {
  return [
    {
      name: 'Profile',
      groupBy: 'My Space',
      value: PROFILE_MENU_OPTION_VALUE.profile,
      type: PROFILE_MENU_OPTION_TYPE.Link,
      groupIcon: AccountCircleOutlinedIcon,
      key: 'profile_menu_1',
      disabled: !username,
      url: `/u/${username || ''}`
    },
    {
      name: 'Create community',
      groupBy: 'My Space',
      value: PROFILE_MENU_OPTION_VALUE.createCommunity,
      type: PROFILE_MENU_OPTION_TYPE.Event,
      groupIcon: AccountCircleOutlinedIcon,
      key: 'profile_menu_2',
      disabled: !username
    },
    {
      name: 'Online Status',
      groupBy: 'My Space',
      value: PROFILE_MENU_OPTION_VALUE.status,
      type: PROFILE_MENU_OPTION_TYPE.Switcher,
      groupIcon: AccountCircleOutlinedIcon,
      key: 'profile_menu_3',
      disabled: true,
      switcher: true
    },
    {
      name: 'Dark Mode',
      groupBy: 'View Options',
      value: PROFILE_MENU_OPTION_VALUE.mode,
      type: PROFILE_MENU_OPTION_TYPE.Switcher,
      groupIcon: PreviewOutlinedIcon,
      key: 'profile_menu_4',
      checked: options.darkMode,
      switcher: true
    },
    {
      name: 'User Agreement',
      groupBy: 'Terms & Policies',
      value: PROFILE_MENU_OPTION_VALUE.userAgreement,
      type: PROFILE_MENU_OPTION_TYPE.Modal,
      groupIcon: InfoOutlinedIcon,
      key: 'profile_menu_5',
      dialog: PROFILE_DIALOG_TYPE.UserAgreement
    }
  ]
}
