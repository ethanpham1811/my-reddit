import { PROFILE_MENU_OPTION_TYPE, SUBREDDIT_TYPE } from '@/src/constants/enums'
import { CheckCircleIcon, CheckIcon } from '@/src/constants/icons'
import { ApolloError } from '@apollo/client'
import { create } from 'react-test-renderer'
import {
  createGroupedList,
  formatNumber,
  generateAutoCompleteUrl,
  generateSeededHexColor,
  generateUserCover,
  generateUserImage,
  generateUserName,
  getTotalUpvote,
  notificationHandler,
  notificationsLabel,
  parseHtml,
  urlsToFile,
  validatePostByFollowing,
  validatePostBySubname,
  validateSubredditMember
} from '../utils'

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn()
}))

/* notificationHandler */
describe('notificationHandler', () => {
  const notification = notificationHandler()

  test('return complete + error response obj', () => {
    expect(notification).toHaveProperty('onCompleted')
    expect(notification).toHaveProperty('onError')
  })

  test('open toast success', () => {
    notification.onCompleted()
    expect(require('react-hot-toast').success).toHaveBeenCalledWith('sucessful!')
  })

  test('open toast error', () => {
    const error = new ApolloError({ errorMessage: 'error!' })
    notification.onError(error)
    expect(require('react-hot-toast').error).toHaveBeenCalledWith(error.message)
  })
})

/* getTotalUpvote */
describe('getTotalUpvote', () => {
  test('returns 0 for an empty array', () => {
    expect(getTotalUpvote([]) || getTotalUpvote(undefined)).toBe(0)
  })

  test('returns 1 for an array with one upvote', () => {
    expect(getTotalUpvote([{ user_id: 1, id: 1, upvote: true }])).toBe(1)
  })

  test('returns -1 for an array with one downvote', () => {
    expect(getTotalUpvote([{ user_id: 1, id: 1, upvote: false }])).toBe(-1)
  })

  test('returns the correct total for an array with multiple votes', () => {
    const votes = [
      { user_id: 1, id: 1, upvote: true },
      { user_id: 2, id: 1, upvote: true },
      { user_id: 2, id: 1, upvote: true },
      { user_id: 3, id: 1, upvote: false },
      { user_id: 4, id: 1, upvote: true },
      { user_id: 5, id: 1, upvote: false }
    ]
    const result = getTotalUpvote(votes)
    expect(result).toBe(2) // 4 upvotes - 2 downvotes = 2
  })
})

/* notificationsLabel */
describe('notificationsLabel', () => {
  const notification = notificationHandler()

  test(`return "no notification"`, () => {
    expect(notificationsLabel(0)).toEqual('no notifications')
  })

  test(`return "<count> notification"`, () => {
    expect(notificationsLabel(22)).toEqual('22 notifications')
  })

  test('return "more than 99 notification"', () => {
    expect(notificationsLabel(222)).toEqual('more than 99 notifications')
  })
})

/* validatePostBySubname */
describe('validatePostBySubname', () => {
  const memberOfIds = ['subreddit1', 'subreddit2']

  test('returns true if subType is Public', () => {
    expect(validatePostBySubname(memberOfIds, 'subreddit3', SUBREDDIT_TYPE.Public)).toBe(true)
    expect(validatePostBySubname(memberOfIds, 'subreddit2', SUBREDDIT_TYPE.Public)).toBe(true)
    expect(validatePostBySubname(memberOfIds, [], SUBREDDIT_TYPE.Public)).toBe(true)
    expect(validatePostBySubname([], 'subreddit3', SUBREDDIT_TYPE.Public)).toBe(true)
    expect(validatePostBySubname(undefined, 'subreddit3', SUBREDDIT_TYPE.Public)).toBe(true)
  })

  test('returns true if subName is in member_of_ids', () => {
    expect(validatePostBySubname(memberOfIds, 'subreddit2', SUBREDDIT_TYPE.Private)).toBe(true)
  })

  test('returns false if member_of_ids is undefined or empty', () => {
    expect(validatePostBySubname([], 'subreddit2', SUBREDDIT_TYPE.Private)).toBe(false)
    expect(validatePostBySubname(undefined, 'subreddit2', SUBREDDIT_TYPE.Private)).toBe(false)
  })

  test('returns false if subName is undefined', () => {
    expect(validatePostBySubname(memberOfIds, undefined, SUBREDDIT_TYPE.Private)).toBe(false)
  })

  test('returns false if subName is not in member_of_ids', () => {
    expect(validatePostBySubname(memberOfIds, 'subreddit3', SUBREDDIT_TYPE.Private)).toBe(false)
  })
})

/* validatePostByFollowing */
describe('validatePostByFollowing', () => {
  const followingIds = ['user1', 'user2']

  test('returns false if followerUsername is undefined', () => {
    const result = validatePostByFollowing(followingIds, undefined)
    expect(result).toBe(false)
  })

  test('returns true if followerUsername is in followingIds', () => {
    const result = validatePostByFollowing(followingIds, 'user1')
    expect(result).toBe(true)
  })

  test('returns false if followerUsername is not in followingIds', () => {
    const result = validatePostByFollowing(followingIds, 'user3')
    expect(result).toBe(false)
  })

  test('returns false if followingIds is undefined', () => {
    const result = validatePostByFollowing(undefined, 'user1')
    expect(result).toBe(false)
  })
})

/* validateSubredditMember */
describe('validateSubredditMember', () => {
  const memberOfIds = ['subreddit1', 'subreddit2']

  test('returns false if subPageName is undefined', () => {
    const result = validateSubredditMember(memberOfIds, undefined)
    expect(result).toBe(false)
  })

  test('returns true if subPageName is in memberOfIds', () => {
    const result = validateSubredditMember(memberOfIds, 'subreddit1')
    expect(result).toBe(true)
  })

  test('returns false if subPageName is not in memberOfIds', () => {
    const result = validateSubredditMember(memberOfIds, 'subreddit3')
    expect(result).toBe(false)
  })

  test('returns false if memberOfIds is undefined', () => {
    const result = validateSubredditMember(undefined, 'subreddit1')
    expect(result).toBe(false)
  })
})

/* createGroupedList */
describe('createGroupedList', () => {
  test('returns an empty array for an empty input list', () => {
    expect(createGroupedList([])).toEqual([])
  })

  test('correctly groups items by "groupBy" property', () => {
    const inputList = [
      { groupBy: 'Group1', groupIcon: CheckIcon, name: 'item1', value: 'item1', key: 'item1', type: PROFILE_MENU_OPTION_TYPE.Link },
      { groupBy: 'Group2', groupIcon: CheckCircleIcon, name: 'item2', value: 'item2', key: 'item2', type: PROFILE_MENU_OPTION_TYPE.Link },
      { groupBy: 'Group1', groupIcon: CheckIcon, name: 'item3', value: 'item3', key: 'item3', type: PROFILE_MENU_OPTION_TYPE.Link }
    ]

    const expectedOutput = [
      {
        group: 'Group1',
        groupIcon: CheckIcon,
        items: [
          { groupBy: 'Group1', groupIcon: CheckIcon, name: 'item1', value: 'item1', key: 'item1', type: PROFILE_MENU_OPTION_TYPE.Link },
          { groupBy: 'Group1', groupIcon: CheckIcon, name: 'item3', value: 'item3', key: 'item3', type: PROFILE_MENU_OPTION_TYPE.Link }
        ]
      },
      {
        group: 'Group2',
        groupIcon: CheckCircleIcon,
        items: [{ groupBy: 'Group2', groupIcon: CheckCircleIcon, name: 'item2', value: 'item2', key: 'item2', type: PROFILE_MENU_OPTION_TYPE.Link }]
      }
    ]

    expect(createGroupedList(inputList)).toEqual(expectedOutput)
  })
})

/* urlsToFile */
describe('urlsToFile', () => {
  test('return FileList from array of url strings', async () => {
    const urls = [
      'https://atmlrrpvxwcbwwhukbze.supabase.co/storage/v1/object/public/post_images/public/02717f7a-6325-485b-a6aa-3c40225f742a.png',
      'https://atmlrrpvxwcbwwhukbze.supabase.co/storage/v1/object/public/post_images/public/06cbe132-89e8-40c6-9a95-b4da1a389278.png'
    ]
    const result = await urlsToFile(urls)

    expect(result).not.toBeNull()
    expect(result).toBeInstanceOf(global.FileList)
    expect(result.length).toBe(2)
  })

  test('returns null for undefined URLs', async () => {
    await expect(urlsToFile(undefined)).resolves.toBeNull()
  })
})

/* customFormatDistance */
describe('customFormatDistance', () => {
  test('returns "now" for the current date', () => {
    // Mocking the formatDistanceToNow function
    jest.mock('date-fns', () => ({
      ...jest.requireActual('date-fns')
    }))

    const { customFormatDistance } = require('../utils')
    const currentDate = new Date()
    const result = customFormatDistance(currentDate)
    expect(result).toBe('now')
  })

  // test('returns a formatted distance for a past date', () => {
  //   // Mocking the formatDistanceToNow function
  //   jest.mock('date-fns', () => ({
  //     ...jest.requireActual('date-fns'),
  //     formatDistanceToNow: jest.fn(() => 'about 2 hours ago')
  //   }))

  //   const { customFormatDistance } = require('../utils')
  //   const pastDate = new Date('2022-01-01T12:00:00Z')
  //   const result = customFormatDistance(pastDate)
  //   console.log(result)
  //   expect(result).toBe('2 hr. ago')
  // })
})

/* generateUserImage */
describe('generateUserImage', () => {
  test('return robohash image url', () => {
    expect(generateUserImage('username')).toEqual('https://robohash.org/username.png')
    expect(generateUserImage()).toEqual('https://robohash.org/seed.png')
  })
})

/* generateUserCover */
describe('generateUserCover', () => {
  test('return picsum.photos image url', () => {
    expect(generateUserCover('username', 200, 150)).toEqual(`https://picsum.photos/seed/username/200/150`)
    expect(generateUserCover(null, 200, 150)).toEqual(`https://picsum.photos/seed/seed/200/150`)
    expect(generateUserCover('username', 200, 150, 7)).toEqual(`https://picsum.photos/seed/username/200/150?blur=7`)
  })
})

/* generateSeededHexColor */
describe('generateSeededHexColor', () => {
  test('generateSeededHexColor should return color hex string', () => {
    const regexp = /^#[0-9a-fA-F]{6}$/
    const randomSeed = generateUserName()
    expect(generateSeededHexColor(randomSeed)).toMatch(regexp)
    expect(generateSeededHexColor(null)).toMatch(regexp)
    expect(generateSeededHexColor(undefined)).toMatch(regexp)
  })
})

/* generateUserName */
describe('generateUserName', () => {
  test('return picsum.photos image url', () => {
    expect(typeof generateUserName()).toBe('string')
  })
})

/* formatNumber */
describe('formatNumber', () => {
  test('return formatted number', () => {
    expect(formatNumber(0)).toEqual('0')
    expect(formatNumber(20)).toEqual('20')
    expect(formatNumber(2300)).toEqual('2.3k')
    expect(formatNumber(2300000)).toEqual('2.3M')
  })
})

/* generateAutoCompleteUrl */
describe('generateAutoCompleteUrl', () => {
  test('return url based on item type', () => {
    expect(generateAutoCompleteUrl({ groupBy: 'Communities', name: 'subreddit1' })).toEqual('/r/subreddit1')
    expect(generateAutoCompleteUrl({ groupBy: 'Top trending', id: 1, subreddit: { name: 'subreddit1' } })).toEqual('/r/subreddit1/post/1')
    expect(generateAutoCompleteUrl({ groupBy: 'People', username: 'ok_admin' })).toEqual('/u/ok_admin')
  })
})

/* parseHtml */
describe('parseHtml', () => {
  test('parseHtml should return ReactElement', () => {
    const result = parseHtml('<div>Hello, world!</div>')
    // Assuming the result is an array of React elements
    expect(Array.isArray(result)).toBeTruthy

    // Check if each item in the array is a React element
    result.forEach((element) => {
      const tree = create(element).toJSON()
      expect(tree).toBeDefined() // Check if the tree is defined, indicating it's a React element
    })
  })
})

/* parseHtml */
describe('parseHtml', () => {
  test('parseHtml should return ReactElement', () => {
    const result = parseHtml('<div>Hello, world!</div>')
    // Assuming the result is an array of React elements
    expect(Array.isArray(result)).toBeTruthy

    // Check if each item in the array is a React element
    result.forEach((element) => {
      const tree = create(element).toJSON()
      expect(tree).toBeDefined() // Check if the tree is defined, indicating it's a React element
    })
  })
})
