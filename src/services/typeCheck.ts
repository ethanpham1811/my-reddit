import { SEARCH_TABS } from '@/src/constants/enums'
import {
  TAutocompleteOptions,
  TQueriedPost,
  TQueriedSub,
  TQueriedTrending,
  TQueriedUser,
  TQueryNotFound,
  TSearchOptions
} from '@/src/constants/types'

export function isQueriedTrending(data: TAutocompleteOptions): data is TQueriedTrending {
  return data['groupBy'] === 'Top trending'
}
export function isQueriedSub(data: TAutocompleteOptions): data is TQueriedSub {
  return data['groupBy'] === 'Communities'
}
export function isQueriedUser(data: TAutocompleteOptions): data is TQueriedUser {
  return data['groupBy'] === 'People'
}

export function isSearchQueriedPost(data: TSearchOptions): data is TQueriedPost {
  return data['groupBy'].toLocaleLowerCase() === SEARCH_TABS.Post
}
export function isSearchQueriedSub(data: TSearchOptions): data is TQueriedSub {
  return data['groupBy'].toLocaleLowerCase() === SEARCH_TABS.Communities
}
export function isSearchQueriedUser(data: TSearchOptions): data is TQueriedUser {
  return data['groupBy'].toLocaleLowerCase() === SEARCH_TABS.People
}
// this is a hack for Displaying no record bug with autocomplete
export function isNotFound(data: TAutocompleteOptions): data is TQueryNotFound {
  return data['groupBy'] === 'Not Found'
}
