import { client } from '@/apollo-client'
import { SUBREDDIT_TYPE } from '@/constants/enums'
import { TAutocompleteOptions, TProfileDropDownList, TProfileDropdownGroupedList, TQueryNotFound, TVote } from '@/constants/types'
import { GET_USER_BY_EMAIL } from '@/graphql/queries'
import { ApolloError } from '@apollo/client'
import { formatDistanceToNow } from 'date-fns'
import groupBy from 'lodash/groupBy'
import { JSXElementConstructor, ReactElement } from 'react'
import toast from 'react-hot-toast'
import ReactHtmlParser from 'react-html-parser'
import { NumberDictionary, animals, colors, uniqueNamesGenerator } from 'unique-names-generator'
import { v4 as rid } from 'uuid'
import { isQueriedSub, isQueriedTrending } from './typeCheck'

/*------------------------------------------ General utilities ----------------------------------------- */
export const notificationHandler = () => {
  return { onCompleted: () => toast.success('sucessful!'), onError: (error: ApolloError) => toast.error(error.message) }
}

export const getTotalUpvote = (votes: TVote[]): number =>
  Array.isArray(votes) ? votes.reduce((prev, cur): number => (cur.upvote ? prev + 1 : prev - 1), 0) : 0

export const notificationsLabel = (count: number) => {
  if (count === 0) return 'no notifications'
  if (count > 99) return 'more than 99 notifications'
  return `${count} notifications`
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

export const createGroupedList = (list: TProfileDropDownList[]): TProfileDropdownGroupedList[] => {
  const groupedArray = groupBy(list, 'groupBy')
  return Object.keys(groupedArray).map((group) => ({
    group,
    groupIcon: groupedArray[group][0].groupIcon,
    items: groupedArray[group]
  }))
}

export async function urlsToFile(urls: string[] | undefined): Promise<FileList | null> {
  if (!urls) return Promise.resolve(null)

  const urlToFile = (url: string, filename: string, mimeType: string): Promise<File> => {
    return fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        return new File([arrayBuffer], filename, { type: mimeType })
      })
  }

  const generateFile = urls.map((url): Promise<File> => {
    const filename = `uploaded_image_${rid()}.jpg`
    const mimeType = 'image/png'

    return urlToFile(url, filename, mimeType)
  })

  return Promise.all(generateFile).then((files): FileList => {
    const fileArray = Array.from(files)
    const dataTransfer = new DataTransfer()
    fileArray.forEach((file) => dataTransfer.items.add(file))
    return dataTransfer.files
  })
}

/* from fns-default "about x hours ago" => "x hr. ago" format */
export const customFormatDistance = (targetDate: Date) => {
  const distance = formatDistanceToNow(targetDate, { addSuffix: true })
  const matches = [...distance.matchAll(/(\d+)\s+(\w+)\s+ago/g)]

  if (matches.length == 0) return 'now'

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
export const generateUserCover = (seed: string | null | undefined, width: number, height: number, blur?: number): string =>
  `https://picsum.photos/seed/${seed ?? 'seed'}/${width}/${height}${blur ? `?blur=${blur}` : ''}`
export const generateSeededHexColor = (seed: string | null | undefined): string => {
  let sum = 0
  for (const letter of seed || 'seed') sum += letter.charCodeAt(0)

  const colorNumber = Math.floor(Math.abs(Math.sin(sum) * 16777215))
  let colorString = colorNumber.toString(16)
  // pad any colors shorter than 6 characters with leading 0s
  while (colorString.length < 6) colorString = '0' + colorString

  return '#' + colorString
}

export const generateUserName = (): string => {
  const numberDictionary = NumberDictionary.generate({ min: 10, max: 99 })
  return uniqueNamesGenerator({ dictionaries: [['Ok', 'Uk', 'Ik', 'Ek', 'Ak'], colors, animals, numberDictionary] }) // Ok_red_donkey_89
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

/*--------------------------------------------- Misc -------------------------------------------- */
export function generateAutoCompleteUrl(option: Exclude<TAutocompleteOptions, TQueryNotFound>): string {
  if (isQueriedTrending(option)) return `/r/${option.subreddit.name}/post/${option.id}`
  if (isQueriedSub(option)) return `/r/${option.name}`
  return `/u/${option.username}`
}
export const parseHtml = (html: string): ReactElement<any, string | JSXElementConstructor<any>>[] => ReactHtmlParser(html)

/*------------------------------------- Server side utils --------------------------------------- */
// A separate function to check if a user exists and validate credentials
export const findUser = async (email: string) => {
  const {
    data: { userByEmail: existedUser },
    error
  } = await client.query({
    variables: { email, fetchPolicy: 'no-cache' },
    query: GET_USER_BY_EMAIL
  })

  if (error) throw new Error(error.message)

  return existedUser
}
