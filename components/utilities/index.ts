import { ApolloError } from '@apollo/client'
import toast from 'react-hot-toast'

export const notificationHandler = () => {
  return { onCompleted: () => toast.success('sucessful!'), onError: (error: ApolloError) => toast.error(error.message) }
}

export const generateUserImage = (seed: string): string => `https://robohash.org/${seed}.png`
