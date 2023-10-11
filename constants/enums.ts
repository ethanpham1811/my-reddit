export const MAX_UPLOADS = 5
export const MAX_TOPIC_CHOSEN = 2
export const DEFAULT_BUTTON_COLOR = 'orange'
export enum ORDERING {
  Asc = 'asc',
  Desc = 'desc'
}
export enum SORT_METHOD {
  New = 'createdAt',
  Hot = 'upvote',
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
export enum BORDER_TYPES {
  Rounded = '4px',
  Circular = '999px',
  Square = 0
}
export enum SEARCH_TABS {
  Post = 'post',
  Communities = 'subreddit',
  People = 'user'
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
