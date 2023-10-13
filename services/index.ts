import { client } from '@/apollo-client'
import { SEARCH_TABS, SUBREDDIT_TYPE } from '@/constants/enums'
import {
  TAutocompleteOptions,
  TQueriedPost,
  TQueriedSub,
  TQueriedTrending,
  TQueriedUser,
  TQueryNotFound,
  TSearchOptions,
  TVote
} from '@/constants/types'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { supabase } from '@/pages/_app'
import { ApolloError } from '@apollo/client'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { formatDistanceToNow } from 'date-fns'
import groupBy from 'lodash/groupBy'
import { JSXElementConstructor, ReactElement } from 'react'
import toast from 'react-hot-toast'
import ReactHtmlParser from 'react-html-parser'

/*------------------------------------------ General utilities ----------------------------------------- */
export const notificationHandler = () => {
  return { onCompleted: () => toast.success('sucessful!'), onError: (error: ApolloError) => toast.error(error.message) }
}

export const getTotalUpvote = (votes: TVote[]): number => votes.reduce((prev, cur): number => (cur.upvote ? prev + 1 : prev - 1), 0)

export const notificationsLabel = (count: number) => {
  if (count === 0) return 'no notifications'
  if (count > 99) return 'more than 99 notifications'
  return `${count} notifications`
}

export const uploadFiles = async (files: FileList): Promise<string[]> => {
  const filePaths: string[] = []
  for (const file of files) {
    const { data, error } = await supabase.storage.from('post_images').upload(file.name, file, {
      cacheControl: '3600',
      upsert: false
    })
    data && filePaths.push(data.path)
    // error && toast this
  }
  return filePaths
}

// weather if the post belongs to the subreddit I have joined, or to the subreddit that is public
export const validatePostBySubname = (memberOfIds: string[] | undefined, subPageName: unknown, subType: SUBREDDIT_TYPE | undefined): boolean => {
  if (subPageName == undefined) return false
  return memberOfIds?.includes(subPageName as string) || subType === SUBREDDIT_TYPE.Public
}

// weather if the post belongs to the user that I'm following
export const validatePostByFollowing = (followingIds: string[] | undefined, followerUsername: unknown): boolean => {
  return followingIds?.includes(followerUsername as string) || false
}

// weather if I belong to a subreddit
export const validateSubredditMember = (memberOfIds: string[] | undefined, subPageName: unknown): boolean => {
  if (subPageName == undefined) return false
  return memberOfIds?.includes(subPageName as string) || false
}

export const createGroupedList = (list: { groupBy: string; groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>; [key: string]: any }[]) => {
  const groupedArray = groupBy(list, 'groupBy')
  return Object.keys(groupedArray).map((group) => ({
    group,
    groupIcon: groupedArray[group][0].groupIcon,
    items: groupedArray[group]
  }))
}

/* from fns-default "about x hours ago" => "x hr. ago" format */
export const customFormatDistance = (targetDate: Date) => {
  const distance = formatDistanceToNow(targetDate, { addSuffix: true })
  const matches = [...distance.matchAll(/(\d+)\s+(\w+)\s+ago/g)]

  if (matches.length == 0) return 'Unknown'

  const unitsMap: { [key: string]: string } = {
    second: 'sec',
    minute: 'min',
    hour: 'hr',
    day: 'day',
    month: 'month',
    year: 'year',
    hours: 'hr'
  }
  const formattedDate = matches
    .map((match) => {
      const [fullMatch, value, unit] = match
      return `${value} ${unitsMap[unit] || unit}. ago`
    })
    .join(' ')
  return formattedDate
}

/*--------------------------------------------- Generators -------------------------------------------- */
export const generateUserImage = (seed: string | null | undefined): string => `https://robohash.org/${seed ?? 'seed'}.png`
export const generateUserCover = (seed: string | null | undefined, width: number, height: number): string =>
  `https://picsum.photos/seed/${seed ?? 'seed'}/${width}/${height}`
export const generateSeededHexColor = (seed: string | null | undefined): string => {
  let sum = 0
  for (const letter of seed || 'seed') sum += letter.charCodeAt(0)

  const colorNumber = Math.floor(Math.abs(Math.sin(sum) * 16777215))
  let colorString = colorNumber.toString(16)
  // pad any colors shorter than 6 characters with leading 0s
  while (colorString.length < 6) colorString = '0' + colorString

  return '#' + colorString
}

/*------------------------------------------- Formats ------------------------------------------- */
export function formatNumber(number: number): string {
  // million format => '5.9M'
  if (number >= 1000000) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 1 }).format(number / 1000000) + 'M'
  }
  // thousand format => '22.3k'
  else if (number >= 1000) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 1 }).format(number / 1000) + 'k'
  }
  // normal format => '16.2'
  else {
    return new Intl.NumberFormat('en-US').format(number)
  }
}

/*----------------------------------------- Type checker----------------------------------------- */
export function isQueriedTrending(data: TAutocompleteOptions): data is TQueriedTrending {
  return data['groupBy'] === 'Top trending'
}
export function isQueriedSub(data: TAutocompleteOptions): data is TQueriedSub {
  return data['groupBy'] === 'Communities'
}
export function isQueriedUser(data: TAutocompleteOptions): data is TQueriedUser {
  return data['groupBy'] === 'People'
}

export function isSearchQueriedPost(data: TSearchOptions): data is TQueriedPost {
  return data['groupBy'].toLocaleLowerCase() === SEARCH_TABS.Post
}
export function isSearchQueriedSub(data: TSearchOptions): data is TQueriedSub {
  return data['groupBy'].toLocaleLowerCase() === SEARCH_TABS.Communities
}
export function isSearchQueriedUser(data: TSearchOptions): data is TQueriedUser {
  return data['groupBy'].toLocaleLowerCase() === SEARCH_TABS.People
}
// this is a hack for Displaying no record bug with autocomplete
export function isNotFound(data: TAutocompleteOptions): data is TQueryNotFound {
  return data['groupBy'] === 'Not Found'
}

/*--------------------------------------------- Misc -------------------------------------------- */
export function generateAutoCompleteUrl(option: Exclude<TAutocompleteOptions, TQueryNotFound>): string {
  if (isQueriedTrending(option)) return `/r/${option.subreddit.name}/post/${option.id}`
  if (isQueriedSub(option)) return `/r/${option.name}`
  return `/u/${option.username}`
}
export const parseHtml = (html: string): ReactElement<any, string | JSXElementConstructor<any>>[] => ReactHtmlParser(html)

// export const pairPassword = async (password: string, dbPassword: string): Promise<boolean> => await bcrypt.compare(password, dbPassword)

/*--------------------------------------- Custom Validation --------------------------------------- */
export const usernameValidation = (value: string): boolean | string => {
  if (value === '' || value == null) return 'Username is required'
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(value)) {
    return 'It should start with an alphabet, should contain "_", no space allowed'
  }
  if (value?.length < 5) return 'Username must be at least 5 characters long'
  return true
}
export const passwordValidation = (value: string): boolean | string => {
  if (value == '') return 'Password is required'
  if (value?.length < 3) return 'Password must be at least 3 characters long'
  return true
}
export const rePasswordValidation = (value: string, password: string): boolean | string => {
  if (value == '') return 'You need to re-type your password'
  if (value !== password) return `Your passwords doesn't match`
  return true
}
export const emailValidation = (value: string): boolean | string => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (value === '' || value === 'N/A') return true
  if (!emailRegex.test(value)) return 'Invalid email address'
  return true
}
export const fullNameValidation = (value: string): boolean | string => {
  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/
  if (value === '') return true
  if (value?.length > 16) return 'Sorry, too long'
  if (!nameRegex.test(value)) return 'Invalid name'
  return true
}
export const postTitleValidation = (value: string): boolean | string => {
  if (value === '' || value == null) return 'Title is required'
  if (value.length < 10) return 'Title must be at least 10 characters long'
  if (value.length > 100) return 'Title must not exceed 100 characters'
  return true
}

/*------------------------------------- Server side utils --------------------------------------- */
// A separate function to check if a user exists and validate credentials
export const findUser = async (username: string) => {
  const {
    data: { userByUsername: existedUser },
    error
  } = await client.query({
    variables: { username, fetchPolicy: 'no-cache' },
    query: GET_USER_BY_USERNAME
  })

  if (error) throw new Error(error.message)

  return existedUser
}
