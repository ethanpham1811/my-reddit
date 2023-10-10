import { ApolloError } from '@apollo/client'
import {
  AutocompleteProps,
  ButtonOwnProps,
  ButtonProps,
  ImageListOwnProps,
  PaletteOptions,
  SelectChangeEvent,
  SelectProps,
  SvgIconTypeMap,
  SxProps,
  TextFieldProps,
  Theme
} from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Session } from 'next-auth'
import { NextRouter } from 'next/router'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { MAIN_MENU_GROUP, ORDERING, SORT_METHOD } from './enums'

/* ------------------------------------------Common Types------------------------------------------ */

export type TUser = {
  id: number
  username: string
  fullName: string
  followers: number
}
export type TUserDetail = TUser & {
  created_at: Date
  email?: string
  dob?: Date
  coverUrl?: string
  photoUrl?: string
  post?: TPost
  karma?: number
  socialLinks?: string[]
}
export type TPost = {
  id: number
  title: string
  body: string
  username: string
  created_at: Date
  subreddit: {
    name: string
  }
  images?: string[]
  comment?: TComment
  vote?: TVote[]
}
export type TTopic = {
  id: number
  name: string
}
export type TSubreddit = {
  name: string
  id: number
}
export type TSubredditDetail = TSubreddit & {
  topics: string[]
  coverUrl?: string
  headline?: string
  description?: string
  member: number
  isChildrenContent: boolean
  subType: string
}
export type TComment = {
  created_at: Date
  username: string
  text: string
}
export type TVote = {
  upvote: boolean
}
export type TSearchTerm = {
  term: string
}
export type TButtonColor = Extract<keyof PaletteOptions, 'orange' | 'blue' | 'white'>
export type TSorter = {
  icon: ReactNode
  methodValue: SORT_METHOD
  label: string
  description: string
  optionDisabled: boolean
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
export type TMenuDropdownProps = {
  session: Session | null
  subListData: TUseSubredditListResponse
  subName: string | string[] | undefined
  userName: string | string[] | undefined
  pathName: string
}
export type TProfileDropdownProps = {
  session: Session | null
  navigate: NextRouter['push']
}
export type TMenuItem = Omit<TSubreddit, 'id'> & {
  name: string
  group: MAIN_MENU_GROUP
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
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
  images: string[] | undefined
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

export type TRdAutoCompleteProps<
  OptionType,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipCom extends React.ElementType<any> = 'div'
> = AutocompleteProps<OptionType, Multiple, DisableClearable, FreeSolo, ChipCom> & {
  width?: string
  flex?: number
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
  renderSelectedOption: (value: string, mobileMode?: boolean) => ReactNode
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void
  width?: string
  maxWidth?: string
  minWidth?: string
  flex?: number
  loading?: boolean
  mobileMode?: boolean
  borderColor?: string
  value?: string
}
export type TRdMultipleDropdownProps = Pick<SelectProps, 'placeholder' | 'sx' | 'children' | 'open'> & {
  renderSelectedOption: (value: string[], setSelectedArray: Dispatch<SetStateAction<string[]>>) => ReactNode
  onChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void
  max?: number
  width?: string
  flex?: number
  loading?: boolean
  borderColor?: string
}
export type TRdImageCarouselProps = {
  width: string
  height: string
  imgList: string[]
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
export type TRdInputProps<T extends FieldValues> = TextFieldProps & {
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  helper?: string
  width?: string
  flex?: number
  bgcolor?: string
  endIcon?: ReactNode
}
export type TRdInlineInputProps<T extends FieldValues> = TextFieldProps & {
  registerOptions?: RegisterOptions
  editable?: boolean
  name: FieldPath<T>
  control: Control<T>
  initialVal: string | number | undefined
  helper?: string
  width?: string
  flex?: number
  bgcolor?: string
  center?: boolean
  loading?: boolean
  endIcon?: boolean
  fontSize?: string
  onFieldSubmit: (field: FieldPath<T>) => void
}
export type TRdStaticInputProps<T extends FieldValues> = TextFieldProps & {
  helper?: string
  width?: string
  flex?: number
  bgcolor?: string
}
export type TCardFeedSorterProps = {
  disabled: boolean
  sortOptions: TSortOptions
  setSortOptions: Dispatch<SetStateAction<TSortOptions>>
}
export type TCardUserInfoProps = {
  user: TUserDetail | null
  loading: boolean
}

/* ------------------------------------------Form Types------------------------------------------ */
export type TCommunityCreatorForm = {
  name: string
  subType: string
  isChildrenContent: boolean
  topic_ids: string[]
}
export type TCardCreatePostForm = Pick<TPost, 'title' | 'body' | 'username'> & {
  subreddit_id: number
  images: FileList
  link: string
}
export type TCardUserInfoForm = {
  email: string
  fullName: string
}

/* ------------------------------------------Hook response Types------------------------------------------ */
export type TUsePostListResponse = { postList: TPost[] | null; loading: boolean; error: ApolloError | undefined }
export type TUseTopicListResponse = { topicList: TTopic[] | null; loading: boolean; error: ApolloError | undefined }
export type TUseSubredditListResponse = { subredditList: TSubreddit[] | null; loading: boolean; error: ApolloError | undefined }

/* ------------------------------------------Data structure Types------------------------------------------ */
export type TCommunityTypeOPtions = {
  label: ReactNode
  value: string
}

/* --------------------------------------------- Query Types---------------------------------------------- */
export type TQueriedTrending = TPost & {
  groupBy: string
  totalUpvotes: number
}
export type TQueriedSub = TSubredditDetail & {
  groupBy: string
}
export type TQueriedUser = TUser & {
  groupBy: string
}
export type TQueryNotFound = {
  text: 'Nothing found.'
  groupBy: string
}
export type TAutocompleteOptions = TQueriedTrending | TQueriedSub | TQueriedUser | TQueryNotFound

/* ------------------------------------------- Next auth Types-------------------------------------------- */
export type TSession = { data: Session | null; status: SessionStatus }
export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated'
