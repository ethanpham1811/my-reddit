import { PROFILE_DIALOG_TYPE } from '@/constants/enums'
import {
  AccountCircleOutlinedIcon,
  AddSharpIcon,
  CampaignOutlinedIcon,
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
    icon: <OutboundOutlinedIcon />,
    name: 'Popular',
    tooltip: 'Work in progress'
  },
  {
    icon: <SmsOutlinedIcon />,
    name: 'Chat',
    notification: {
      content: 12,
      max: 99
    },
    hideOnMobile: true,
    tooltip: 'Work in progress'
  },
  {
    icon: <NotificationsOutlinedIcon />,
    name: 'Notification',
    notification: {
      content: 999,
      max: 99
    },
    tooltip: 'Work in progress'
  },
  {
    icon: <AddSharpIcon />,
    name: 'Create',
    hideOnMobile: true,
    tooltip: 'Work in progress'
  },
  {
    icon: <CampaignOutlinedIcon />,
    name: 'Advertise',
    hideOnMobile: true,
    tooltip: 'Work in progress'
  }
]

/* data tree for Profile Menu Dropdown */
export function buildProfileMenuData(username: string | undefined): TProfileDropDownList[] {
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
