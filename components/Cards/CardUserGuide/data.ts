import {
  ArticleOutlinedIcon,
  GroupsOutlinedIcon,
  PersonAddAltOutlinedIcon,
  ScreenSearchDesktopOutlinedIcon,
  VpnKeyOutlinedIcon
} from '@/constants/icons'
import { TCardGuideListData } from '@/constants/types'

export const guideListData: TCardGuideListData[] = [
  {
    icon: VpnKeyOutlinedIcon,
    color: 'orange.main',
    text: `Register your account or use guest's`
  },
  {
    icon: GroupsOutlinedIcon,
    color: 'blue.main',
    text: 'Join a community or create one'
  },
  {
    icon: ArticleOutlinedIcon,
    color: 'yellow.main',
    text: 'Post your first article'
  },
  {
    icon: PersonAddAltOutlinedIcon,
    color: 'green.main',
    text: 'Follow people you like'
  },
  {
    icon: ScreenSearchDesktopOutlinedIcon,
    color: 'purple.main',
    text: 'Search for posts'
  }
]
