import { MessageBoard } from '@/components'
import { SUBREDDIT_TYPE } from '@/constants/enums'
import { TPost } from '@/constants/types'
import { ReactNode } from 'react'
import { validatePostByFollowing, validateSubredditMember } from './utils'

/**
 * Append new paginated posts to current post list, this is cb function used in fetchMore
 * - appendHomePagePosts: homepage (direct post list)
 * - appendPosts: sub page & user page (nested in user & sub obj)
 */
export function appendHomePagePosts(prev: { [key: string]: TPost[] }, fetchMoreResult: { [key: string]: TPost[] }) {
  const isCurrentListEmpty: boolean = !prev || !prev.postPaginatedList
  return isCurrentListEmpty
    ? fetchMoreResult
    : {
        postPaginatedList: [...(prev?.postPaginatedList || []), ...(fetchMoreResult?.postPaginatedList || [])]
      }
}
export function appendPosts(key: string) {
  return (prev: { [key: string]: { [key: string]: TPost[] } }, fetchMoreResult: { [key: string]: { [key: string]: TPost[] } }) => {
    const isCurrentListEmpty: boolean = !prev || !prev[key]
    return isCurrentListEmpty
      ? fetchMoreResult
      : {
          [key]: {
            ...prev[key],
            post: [...(prev[key]?.post || []), ...(fetchMoreResult[key]?.post || [])]
          }
        }
  }
}

/**
 * verify user permission to view content of page & return message if failed
 * - noPermissionSubPageMsg: sub page => check if user is member || subType == public
 * - noPermissionUserPageMsg: user page => check if user is followed || user page is  user's itself
 */
export function noPermissionSubPageMsg(
  member_of_ids: string[] | undefined,
  subType: SUBREDDIT_TYPE | undefined,
  subName: string | string[] | undefined
): ReactNode | false {
  const verifyIsMember = validateSubredditMember(member_of_ids, subName)

  return subName && !verifyIsMember && subType !== SUBREDDIT_TYPE.Public ? (
    <MessageBoard head="This community is private, please join " highlight={subName as string} />
  ) : (
    false
  )
}

export function noPermissionUserPageMsg(
  following_ids: string[] | undefined,
  myUsername: string | string[] | undefined,
  username: string | string[] | undefined,
  isUserPage?: boolean
): ReactNode | false {
  const verifyFollower = validatePostByFollowing(following_ids, username) || myUsername === username

  return !myUsername ? ( // if user is not logged in
    <MessageBoard head="You need to " highlight="login" tail=" to view their content" hasLogin hasBackground={isUserPage} />
  ) : !verifyFollower ? ( // if user is not following the user page
    <MessageBoard head="You need to follow " highlight={username as string} tail=" to view their posts" hasBackground={isUserPage} />
  ) : (
    false
  )
}
