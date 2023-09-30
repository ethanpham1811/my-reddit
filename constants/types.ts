import { PaletteOptions } from '@mui/material'
import { StaticImageData } from 'next/image'

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
export type TUser = {
  name: string
  image?: string
  id: string
  // image: string
}
export type TImage = {
  imgSrc: StaticImageData
  caption: string
}
export type TSearchTerm = {
  term: string
}
export type TButtonColor = Extract<keyof PaletteOptions, 'orange' | 'blue' | 'white'>
