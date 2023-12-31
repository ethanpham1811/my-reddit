import { AutocompleteProps, PaletteOptions, SelectChangeEvent, SelectProps, SvgIconTypeMap, SxProps, TextFieldProps } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { StorageError } from '@supabase/storage-js'
import { Session } from '@supabase/supabase-js'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Control, FieldPath, FieldValues, Path, PathValue, RegisterOptions, UseFormGetValues, UseFormReset, UseFormSetValue } from 'react-hook-form'
import {
  MAIN_MENU_GROUP,
  ORDERING,
  PAYMENT_STEP_COM_NAME,
  PROFILE_DIALOG_TYPE,
  PROFILE_MENU_OPTION_TYPE,
  SEARCH_TABS,
  SORT_METHOD,
  SUBREDDIT_TYPE
} from './enums'

/* --------------------------------------------Common Types-------------------------------------------- */
export type TUserCompact = {
  id: number
  username: string
}
export type TUser = TUserCompact & {
  fullName: string
  followers: number
  role?: string
}
export type TUserDetail = TUser & {
  created_at: Date
  email?: string
  dob?: string
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
  link: string
  linkDescription: string
  user: TUserDetail
  created_at: Date
  subreddit: Pick<TSubredditDetail, 'id' | 'name' | 'subType'>
  images?: string[]
  comment?: TComment[]
  vote?: TVote[]
  totalUpvotes?: number
  totalComments?: number
}
export type TTopic = {
  id: number
  name: string
}
export type TSubreddit = {
  name: string
  id: number
  subType: SUBREDDIT_TYPE
}
export type TSubredditDetail = TSubreddit & {
  topics: string[]
  coverUrl?: string
  headline?: string
  description?: string
  member: number
  isChildrenContent: boolean
  created_at: string
  user: {
    username: string
  }
  post: TPost[]
}
export type TComment = {
  id: number
  created_at: string
  user: TUser
  text: string
}
export type TVote = {
  upvote: boolean
  user_id: number
  id: number
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
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  name: string
  tooltip?: string
  notification?: TNotiData
  hideOnMobile?: boolean
  disabled?: boolean
  onClick: () => unknown
}
export type TMenuItem = Omit<TSubreddit, 'id' | 'subType'> & {
  url?: string
  group: MAIN_MENU_GROUP
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
export type TRadioOption = {
  value: string
  label: string
  description: string
  disabled: boolean
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
export type TSortOptions = {
  method: SORT_METHOD
  ordering: ORDERING
}
export type ServerResponseData = {
  message?: string
  error?: string
}

export type TSelectOption = {
  title: string
  cb: () => void
}

export type TFetchMoreArgs = {
  offset: number
  limit?: number
}
export type TStorageError = StorageError & {
  statusCode: string
}

/* ---------------------------------------------Props Types--------------------------------------------- */
export type TCardPostProps = {
  post: TPost
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
> = Omit<AutocompleteProps<OptionType, Multiple, DisableClearable, FreeSolo, ChipCom>, 'sx'> & {
  width?: string
  flex?: number
  isMobile?: boolean
  sx: SxProps
  focused: boolean
}

export type TRdDropdownProps = Pick<SelectProps, 'placeholder' | 'sx' | 'children' | 'error' | 'disabled' | 'autoFocus' | 'onOpen' | 'onClick'> & {
  renderSelectedOption: (value: string) => ReactNode
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
export type TRdMultipleDropdownProps<T extends FieldValues, P extends { id: number }> = Pick<
  SelectProps,
  'placeholder' | 'sx' | 'children' | 'open'
> & {
  renderSelectedOption: (value: PathValue<T, Path<T>>) => ReactNode
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  max?: number
  flex?: number
  loading?: boolean
  borderColor?: string
}

export type TRdSubredditAutoCompleteProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  width?: string
  flex?: number
}
export type TRdInputProps<T extends FieldValues> = TextFieldProps & {
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  helper?: string
  letterCount?: number
  width?: string
  height?: string
  flex?: number
  bgcolor?: string
  endIcon?: ReactNode
  indentedHelper?: boolean
}
export type TRdInlineInputProps<T extends FieldValues> = TextFieldProps & {
  registerOptions?: RegisterOptions
  name: FieldPath<T>
  control: Control<T>
  helper?: string
  width?: string
  bgcolor?: string
  center?: boolean
  headline?: boolean
  loading?: boolean
  endIcon?: boolean
  fontSize?: string
  onFieldSubmit: (field: FieldPath<T>, val: unknown) => void
}
export type TRdStaticInputProps<T extends FieldValues> = TextFieldProps & {
  helper?: string
  width?: string
  flex?: number
  bgcolor?: string
  borderColor?: string
}
export type TCardUserInfoProps = {
  user: TUserDetail | null
  loading: boolean
}

/* ----------------------------------------------Form Types---------------------------------------------- */
export type TCommunityCreatorForm = {
  name: string
  subType: SUBREDDIT_TYPE
  isChildrenContent: boolean
  topic_ids: string[]
}
export type TCardCreatePostForm = Pick<TPost, 'title' | 'body'> & {
  id?: number
  subreddit_id: number
  images: FileList | undefined
  link: string
  linkDescription: string
}
export type TCardUserInfoForm = {
  fullName: string
  dob: string
}
export type TFormColumnProps<T extends FieldValues> = {
  control: Control<T>
  getFormValues: UseFormGetValues<T>
  setFormValue: UseFormSetValue<T>
  loading: boolean
  isLinkPost: boolean
  subId: number | undefined
  imagesValue: FileList | undefined
  editModePayload?: TEditModePayload
  isDirty: boolean
  formOpened: boolean
  reset: UseFormReset<T>
  setIsLinkPost: Dispatch<SetStateAction<boolean>>
}
export type TPostCommentForm = {
  comment: string
}
export type TSubredditEditForm = {
  description: string
  headline: string
}
/* ------------------------------------------Data structure Types----------------------------------------- */
export type TCommunityTypeOPtions = {
  label: string
  description: string
  value: string
  disabled: boolean
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
export type TProfileDropDownList = {
  name: string
  value: string
  key: string
  groupBy: string
  type: PROFILE_MENU_OPTION_TYPE
  disabled?: boolean
  switcher?: boolean
  checked?: boolean
  url?: string
  dialog?: PROFILE_DIALOG_TYPE
  groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
export type TProfileDropdownGroupedList = {
  group: string
  groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  items: TProfileDropDownList[]
}
export type TEditModePayload = Pick<TCardCreatePostForm, 'title' | 'body' | 'link' | 'linkDescription'> & {
  images: string[] | undefined
}
export type TCardGuideListData = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  text: string
  color: string
}

/* --------------------------------------------- Data Types---------------------------------------------- */

export type TStepperData = {
  stepLabel: string
  component: PAYMENT_STEP_COM_NAME
  checkStatus?: boolean
}

/* --------------------------------------------- Query Types---------------------------------------------- */
export type TQueriedTrending = TPost & {
  groupBy: string
  totalUpvotes: number
  totalComments: number
}
export type TQueriedPost = TPost & {
  groupBy: string
  totalItems: number
}
export type TQueriedSub = TSubredditDetail & {
  groupBy: string
  totalItems: number
}
export type TQueriedUser = TUser & {
  groupBy: string
  totalItems: number
}
export type TQueriedResponse = {
  queriedPosts: TQueriedPost[]
  queriedSubs: TQueriedSub[]
  queriedUsers: TQueriedUser[]
}
export type TQueriedList = TQueriedPost[] | TQueriedSub[] | TQueriedUser[]
export type TQueryNotFound = {
  text: string
  groupBy: string
}
export type TAutocompleteOptions = TQueriedTrending | TQueriedSub | TQueriedUser | TQueryNotFound
export type TSearchOptions = TQueriedPost | TQueriedSub | TQueriedUser

/* ------------------------------------------- Next auth Types-------------------------------------------- */
export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type TAppSession =
  | (Session & {
      userDetail: TUserDetail | null
    })
  | null
