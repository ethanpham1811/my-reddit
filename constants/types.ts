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
import { Session } from '@supabase/supabase-js'
import { NextRouter } from 'next/router'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { MAIN_MENU_GROUP, ORDERING, SEARCH_TABS, SORT_METHOD, SUBREDDIT_TYPE } from './enums'

/* ------------------------------------------Common Types------------------------------------------ */

export type TUser = {
  id: number
  username: string
  fullName: string
  followers: number
  role?: string
}
export type TUserDetail = TUser & {
  created_at: Date
  email?: string
  dob?: Date
  coverUrl?: string
  photoUrl?: string
  karma?: number
  socialLinks?: string[]
  member_of_ids?: string[]
  following_ids?: string[]
  post: TPost[]
}
export type TPost = {
  id: number
  title: string
  body: string
  user: TUserDetail
  created_at: Date
  subreddit: Pick<TSubredditDetail, 'id' | 'name' | 'subType'>
  images?: string[]
  comment?: TComment[]
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
  subType: SUBREDDIT_TYPE
  created_at: Date
  post: TPost[]
}
export type TComment = {
  id: number
  created_at: Date
  user: TUser
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
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  methodValue: SORT_METHOD
  label: string
  description: string
  optionDisabled: boolean
}
export type TSearchTabBtn = {
  value: SEARCH_TABS
  title: string
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
  subName: string | string[] | undefined
  userPageName: string | string[] | undefined
  pathName: string
}
export type TProfileDropdownProps = {
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
  disabled: boolean
}
export type TSortOptions = {
  method: SORT_METHOD
  ordering: ORDERING
}
export type ServerResponseData = {
  message?: string
  error?: string
}

/* ------------------------------------------Props Types------------------------------------------ */
export type TCardPostProps = Pick<TPost, 'id' | 'title' | 'body' | 'comment'> & {
  createdAt: Date
  subName: string
  username: string
  images: string[] | undefined
  upvote: number
  inGroup?: boolean
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
  Pick<ButtonProps, 'type' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'> & {
    text: string
    filled?: boolean
    color?: TButtonColor
    invertColor?: boolean
    sx?: SxProps<Theme>
    flex?: number
    width?: string
  }
export type TRdDropdownProps = Pick<SelectProps, 'placeholder' | 'sx' | 'children' | 'error'> & {
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
  offsetTop?: string
  offsetBot?: string
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
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
  sx?: SxProps<Theme>
}
export type TRdTextEditorProps<T extends FieldValues> = {
  registerOptions?: RegisterOptions
  placeholder: string
  name: FieldPath<T>
  control: Control<T>
  height?: number
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
  indentedHelper?: boolean
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
  subType: SUBREDDIT_TYPE
  isChildrenContent: boolean
  topic_ids: string[]
}
export type TCardCreatePostForm = Pick<TPost, 'title' | 'body'> & {
  subreddit_id: number
  images: FileList
  link: string
}
export type TCardUserInfoForm = {
  email: string
  fullName: string
}

/* ------------------------------------------Hook response Types------------------------------------------ */
export type TUsePostListResponse = [postList: TPost[] | null, loading: boolean, error: ApolloError | undefined]
export type TUseTopicListResponse = { topicList: TTopic[] | null; loading: boolean; error: ApolloError | undefined }
export type TUseSubredditListResponse = { subredditList: TSubreddit[] | null; loading: boolean; error: ApolloError | undefined }

/* ------------------------------------------Data structure Types------------------------------------------ */
export type TCommunityTypeOPtions = {
  label: ReactNode
  value: string
  disabled: boolean
}

/* --------------------------------------------- Query Types---------------------------------------------- */
export type TQueriedTrending = TPost & {
  groupBy: string
  totalUpvotes: number
}
export type TQueriedPost = TPost & {
  groupBy: string
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
export type TSearchOptions = TQueriedPost | TQueriedSub | TQueriedUser

/* ------------------------------------------- Next auth Types-------------------------------------------- */
export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type TAppSession =
  | (Session & {
      userDetail: TUserDetail | null
      loading: boolean
    })
  | null
