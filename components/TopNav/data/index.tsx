import { NOTI_BOX_NAME, PROFILE_DIALOG_TYPE } from '@/constants/enums'
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
import { TIconBox, TProfileDropDownList } from '@/constants/types'
import { Dispatch, SetStateAction } from 'react'

type TBuildDataProps = {
  toggleColorMode: () => void
  openPremiumDrawer: () => void
  setUserGuideOpen: Dispatch<SetStateAction<boolean>>
  navigate: (url: string) => Promise<boolean>
}

/* data tree for Notification Box */
export const buildData = ({ toggleColorMode, openPremiumDrawer, setUserGuideOpen, navigate }: TBuildDataProps): TIconBox[] => [
  {
    icon: DarkModeOutlinedIcon,
    name: NOTI_BOX_NAME.Darkmode,
    tooltip: 'Dark mode',
    onClick: toggleColorMode
  },
  {
    icon: OutboundOutlinedIcon,
    name: NOTI_BOX_NAME.Popular,
    tooltip: 'Top trending posts',
    onClick: () => navigate('/search')
  },
  {
    icon: StarsIcon,
    name: NOTI_BOX_NAME.Premium,
    tooltip: 'Premium subscription',
    hideOnMobile: true,
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
