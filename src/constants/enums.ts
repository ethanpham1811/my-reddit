export const GUEST_EMAIL = 'guest_account@gmail.com'
export const GUEST_PASSWORD = '123123'
export const MAX_UPLOADS = 5
export const MAX_TOPIC_CHOSEN = 2
export const QUERY_LIMIT = 5
export const NON_SUB_FEED_LAYOUT_TOP_OFFSET = '70px'
export const MAX_TOP_TRENDING_HEIGHT = 120
export const MAX_NEW_FEEDS_POST_HEIGHT = 200
export const OPTIMISTIC_TEMP_ID = 99999
export const DEFAULT_BUTTON_COLOR = 'orange'
export const BUCKET = 'post_images'
export const BUCKET_SUBFOLDER = 'public'
export const SHOW_SCROLL_TOP_THRESHOLD = 50
export const INIT_SCROLL_TOP_THRESHOLD = 200
export const SEARCH_DEBOUNCE_TIMER = 500
export const UPDATE_USER_ARRAY_KEY = ['member_of_ids', 'following_ids', 'socialLinks']

/*------------------------------Enums---------------------------*/
export enum NOTI_BOX_NAME {
  Darkmode = 'Darkmode',
  Popular = 'Popular',
  Premium = 'Premium',
  Notification = 'Notification',
  Guide = 'Guide'
}
export enum ORDERING {
  Asc = 'asc',
  Desc = 'desc'
}
export enum SORT_METHOD {
  New = 'created_at',
  Hot = 'totalUpvotes',
  Rising = 'trending'
}
export enum SUBREDDIT_LIST_MODE {
  Simple = 'simple',
  Other = 'other'
}
export enum MAIN_MENU_GROUP {
  Feeds = 'Feeds',
  Communities = 'Your Communities',
  People = 'People',
  CurrentPage = 'Active'
}
export enum SUB_PEOPLE_MENU_ITEM {
  Communities = 'Communities',
  People = 'People',
  Disabled = 'Disabled'
}
export enum BORDER_TYPES {
  Rounded = '4px',
  Circular = '999px',
  Square = 0
}
export enum SEARCH_TABS {
  Post = 'post',
  Communities = 'communities',
  People = 'people'
}
export enum SESSION_STATUS {
  Loading = 'loading',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated'
}
export enum SUBREDDIT_TYPE {
  Private = 'private',
  Public = 'public',
  Restricted = 'restricted'
}
export enum PROFILE_DIALOG_TYPE {
  Logout = 'logout',
  UserAgreement = 'userAgreement'
}
export enum MOBILE_CUSTOM_BREAKPOINT {
  Lg = '(max-width:1024px)',
  Md = '(max-width:700px)'
}
export enum PAYMENT_STEP_COM_NAME {
  PremiumInfo = 'PremiumInfo',
  PricingInfo = 'PricingInfo',
  PaymentCheckout = 'PaymentCheckout'
}
export enum PROFILE_MENU_OPTION_TYPE {
  Link = 'Link',
  Modal = 'Modal',
  Event = 'Event',
  Switcher = 'Switcher'
}
export enum PROFILE_MENU_OPTION_VALUE {
  profile = 'profile',
  createCommunity = 'createCommunity',
  status = 'status',
  userAgreement = 'userAgreement',
  mode = 'mode'
}
export enum DARK_MODE {
  dark = 'dark',
  light = 'light'
}
