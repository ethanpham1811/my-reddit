import { PaletteOptions } from '@mui/material'

export type Post = {
  title: string
  body: string
  image: string
  subreddit: string
}
export type ButtonColor = Extract<keyof PaletteOptions, 'orange' | 'blue' | 'white'>
