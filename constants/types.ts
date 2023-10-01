import { PaletteOptions } from '@mui/material'

export type TPost = {
  title: string
  body: string
  username: string
  comment: TComment
  created_at: Date
  subreddit: {
    name: string
  }
  images: string
  vote: TVote[]
}
export type TCardPostProps = Pick<TPost, 'title' | 'body' | 'comment' | 'username'> & {
  createdAt: Date
  subreddit: string
  images: TImage[]
  upvote: number
}

export type TSubreddit = {
  topic: string
  name: string
  id: number
  // image: string
}
export type TComment = {
  created_at: Date
  username: string
  text: string
}
export type TVote = {
  upvote: boolean
}
export type TUser = {
  name: string
  image?: string
  id: string
  // image: string
}
export type TImage = {
  imgSrc: string
  caption?: string
}
export type TSearchTerm = {
  term: string
}
export type TButtonColor = Extract<keyof PaletteOptions, 'orange' | 'blue' | 'white'>
