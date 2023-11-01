import { TQueriedSub, TQueriedUser, TUserDetail } from '@/constants/types'
import { formatNumber, validatePostByFollowing, validateSubredditMember } from '@/src/utils'

export const getFields = (
  me: TUserDetail | null | undefined,
  item: TQueriedSub | TQueriedUser
): {
  name: string
  status: boolean
  btnText: string
  extraText: string
  link: string
} => {
  let name = ''
  let status = false
  let btnText = ''
  let extraText = ''
  let link = '/'

  if ('username' in item) {
    name = item.username?.toString()
    status = me ? validatePostByFollowing(me?.following_ids, item.username) : false
    btnText = status ? 'Following' : 'Follow'
    extraText = formatNumber(item.followers) + ' Followers'
    link = `u/${item.username}`
  } else {
    name = item.name?.toString()
    status = me ? validateSubredditMember(me?.member_of_ids, item.name) : false
    btnText = status ? 'Joined' : 'Join'
    extraText = formatNumber(item.member || 0) + ' Members'
    link = `r/${item.name}`
  }
  return { name, status, btnText, extraText, link }
}
