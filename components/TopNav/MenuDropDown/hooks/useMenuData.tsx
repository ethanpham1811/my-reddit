import { MAIN_MENU_GROUP } from '@/constants/enums'
import { HomeIcon } from '@/constants/icons'
import { TMenuItem, TUserDetail } from '@/constants/types'

function useMenuData(me: TUserDetail | null | undefined, isUserOrSubPage: boolean, activePage: string): TMenuItem[][] {
  const followingSubList: string[] | undefined = me?.member_of_ids
  const followingUserList: string[] | undefined = me?.following_ids

  /* Mock data--------------------------------- */
  const feedsOptions: TMenuItem[] = [
    {
      name: 'Home',
      icon: HomeIcon,
      group: MAIN_MENU_GROUP.Feeds
    }
  ]
  const communityOptions: TMenuItem[] = followingSubList
    ? followingSubList.map((name: string): TMenuItem => ({ name, group: MAIN_MENU_GROUP.Communities }))
    : []
  const followingOptions: TMenuItem[] = followingUserList
    ? followingUserList.map((name: string): TMenuItem => ({ name, group: MAIN_MENU_GROUP.People }))
    : []
  const activeOptions: TMenuItem[] = isUserOrSubPage
    ? [
        {
          name: activePage,
          group: MAIN_MENU_GROUP.CurrentPage
        }
      ]
    : []
  /* End Mock data----------------------- */

  return [feedsOptions, communityOptions, followingOptions, activeOptions]
}

export default useMenuData
