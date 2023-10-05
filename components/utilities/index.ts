import { TImage, TVote } from '@/constants/types'
import { supabase } from '@/pages/_app'
import { ApolloError } from '@apollo/client'
import toast from 'react-hot-toast'

export const notificationHandler = () => {
  return { onCompleted: () => toast.success('sucessful!'), onError: (error: ApolloError) => toast.error(error.message) }
}

export const generateUserImage = (seed: string | null | undefined): string => `https://robohash.org/${seed ?? 'seed'}.png`
export const generateSeededHexColor = (seed: string | null | undefined): string => {
  let sum = 0
  for (const letter of seed || 'seed') sum += letter.charCodeAt(0)

  const colorNumber = Math.floor(Math.abs(Math.sin(sum) * 16777215))
  let colorString = colorNumber.toString(16)
  // pad any colors shorter than 6 characters with leading 0s
  while (colorString.length < 6) colorString = '0' + colorString

  return '#' + colorString
}

export const getTotalUpvote = (votes: TVote[]): number => votes.reduce((prev, cur): number => (cur.upvote ? prev + 1 : prev - 1), 0)

export const parseImages = (imgString: string): TImage[] => {
  const a = [{ name: 'khoi' }]

  return JSON.parse(JSON.stringify(a)) as TImage[]
}

export const notificationsLabel = (count: number) => {
  if (count === 0) {
    return 'no notifications'
  }
  if (count > 99) {
    return 'more than 99 notifications'
  }
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
