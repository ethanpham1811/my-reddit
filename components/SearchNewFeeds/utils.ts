import { SEARCH_TABS } from '@/constants/enums'
import { TQueriedSub, TQueriedUser, TUserDetail } from '@/constants/types'
import { formatNumber, validatePostByFollowing, validateSubredditMember } from '@/src/utils'

/* Map data of user/subreddit according to each type */
export const getFields = (
  me: TUserDetail | null | undefined,
  item: TQueriedSub | TQueriedUser
): {
  name: string
  status: boolean
  btnText: string
  extraText: string
  link: string
  revertBtnText: string
  ownerUsername: string | undefined
  type: Exclude<SEARCH_TABS, SEARCH_TABS.Post>
} => {
  let name = ''
  let status = false
  let btnText = ''
  let revertBtnText = ''
  let extraText = ''
  let link = '/'
  let ownerUsername = undefined
  let type = SEARCH_TABS.People

  if ('username' in item) {
    name = item.username?.toString()
    status = me ? validatePostByFollowing(me?.following_ids, item.username) : false
    btnText = status ? 'Following' : 'Follow'
    revertBtnText = status ? 'Unfollow' : 'Follow'
    extraText = formatNumber(item.followers) + ' followers'
    link = `u/${item.username}`
  } else {
    name = item.name?.toString()
    status = me ? validateSubredditMember(me?.member_of_ids, item.name) : false
    btnText = status ? 'Joined' : 'Join'
    revertBtnText = status ? 'Leave' : 'Join'
    extraText = formatNumber(item.member || 0) + ' members'
    link = `r/${item.name}`
    type = SEARCH_TABS.Communities
    ownerUsername = item?.user?.username
  }
  return { name, status, btnText, extraText, link, revertBtnText, ownerUsername, type }
}
