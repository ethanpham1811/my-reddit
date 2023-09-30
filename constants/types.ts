import { PaletteOptions } from '@mui/material'

export type TPost = {
  title: string
  body: string
  image: string
  subreddit: string
}
export type TSubreddit = {
  topic: string
  // image: string
}
export type TSearchTerm = {
  term: string
}
export type TButtonColor = Extract<keyof PaletteOptions, 'orange' | 'blue' | 'white'>
