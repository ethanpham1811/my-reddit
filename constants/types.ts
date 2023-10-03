import { ApolloError } from '@apollo/client'
import { ButtonOwnProps, ButtonProps, ImageListOwnProps, PaletteOptions, SelectChangeEvent, SelectProps, SxProps, Theme } from '@mui/material'
import { Session } from 'next-auth'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { ORDERING, SORT_METHOD } from './enums'

/* ------------------------------------------Common Types------------------------------------------ */
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

export type TSubreddit = {
  name: string
  id: number
}

export type TSubredditPage = TSubreddit & {
  topics: string[]
  coverUrl?: string
  headline?: string
  description?: string
  member: number
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
export type TSorter = {
  icon: ReactNode
  methodValue: string
  label: string
  description: string
  disabled: boolean
}
export type TNotiData = {
  content: number
  max: number
}
export type TIconBox = {
  icon: ReactNode
  name: string
  notification?: TNotiData
}
export type TMenuProps = {
  session: Session | null
}
export type TMenuItem = {
  name: string
  value: string
  icon: ReactNode | null
}
export type TRadioOption = {
  value: string
  label: string | ReactNode
}
export type TSortOptions = {
  method: SORT_METHOD
  ordering: ORDERING
}

/* ------------------------------------------Props Types------------------------------------------ */
export type TCardPostProps = Pick<TPost, 'title' | 'body' | 'comment' | 'username'> & {
  createdAt: Date
  subreddit: string
  images: TImage[]
  upvote: number
}
export type IsChildrenGroupCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
}
export type TRdCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label: string | ReactNode
}
export type TRdDrawerProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}
export type TBottomNavigatorProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}
export type TCommunityCreatorProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}
export type TRdAutoCompleteProps<T extends FieldValues> = {
  options: TSubreddit[]
  startAdornment?: ReactNode
  placeholder: string
  id: string
  loading: boolean
  arrow?: boolean
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
  bgcolor?: string
}
export type TRdButtonProps = ButtonOwnProps &
  Pick<ButtonProps, 'type' | 'onClick'> & {
    text: string
    filled?: boolean
    color?: TButtonColor
    invertColor?: boolean
    sx?: SxProps<Theme>
    flex?: number
    width?: string
  }
export type TRdDropdownProps = Pick<SelectProps, 'placeholder' | 'sx' | 'children'> & {
  renderSelectedOption: (value: string) => ReactNode
  value: string
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  width?: string
  flex?: number
  loading: boolean
  borderColor?: string
}
export type TRdImageCarouselProps = {
  width: string
  height: string
  imgList: TImage[]
}
export type TRdImageListProps = Omit<ImageListOwnProps, 'children'> & {
  images: FileList
}
export type TRdImageUploaderProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
}
export type TRdNotiBubbleProps = {
  content: number | string
  max: number
  children: ReactNode
}
export type TRdRadioGroupProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  options: TRadioOption[]
  label: string | ReactNode
}
export type TRdSubredditAutoCompleteProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
}
export type TRdSubredditSelectProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
  sx?: SxProps<Theme>
}
export type TRdTextEditorProps<T extends FieldValues> = {
  placeholder: string
  name: FieldPath<T>
  control: Control<T>
}
export type TRdInputProps<T extends FieldValues> = {
  placeholder?: string
  name: FieldPath<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  helper?: string
  width?: string
  flex?: number
  sx?: SxProps<Theme>
  bgcolor?: string
}
export type TCardFeedSorterProps = {
  sortOptions: TSortOptions
  setSortOptions: Dispatch<SetStateAction<TSortOptions>>
}

/* ------------------------------------------Form Types------------------------------------------ */
export type TCommuinityCreatorForm = {
  name: string
  type: string
  isChildrenContent: boolean
  topic: string
}
export type TCardCreatePostForm = Pick<TPost, 'title' | 'body' | 'username'> & {
  subreddit_id: number
  images: FileList
  link: string
}

/* ------------------------------------------Hook response Types------------------------------------------ */
export type TUsePostListResponse = { postList: TPost[] | null; loading: boolean; error: ApolloError | undefined }

/* ------------------------------------------Data structure Types------------------------------------------ */
export type TCommunityTypeOPtions = {
  label: ReactNode
  value: string
}
