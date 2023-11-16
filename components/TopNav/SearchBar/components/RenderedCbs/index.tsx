import { ErrorOutlineIcon } from '@/constants/icons'
import { TAutocompleteOptions } from '@/constants/types'
import { Box, Divider, ListSubheader, Stack, Typography } from '@/mui'
import { isNotFound, isQueriedSub, isQueriedTrending, isQueriedUser } from '@/src/typeCheck'
import { generateAutoCompleteUrl } from '@/src/utils'
import { AutocompleteRenderGroupParams } from '@mui/material/Autocomplete'
import { Fragment, HTMLAttributes, ReactNode } from 'react'
import { v4 as rid } from 'uuid'
import NotFoundOption from '../NotFoundOption'
import QueriedSubUserOption from '../QueriedSubUserOption'
import TopTrendingOption from '../TopTrendingOption'

/**
 * The container that wrap all list item inside the popover:
 * - show "TOP TRENDING" if user input nothing
 * - show "Please enter to search for post" if user input search term
 */
export const renderContainer = (props: HTMLAttributes<HTMLElement>, searchTerm: string) => {
  return (
    <Box bgcolor="white.main">
      <Stack
        textAlign="right"
        px={2}
        py={0.5}
        display="flex"
        flexDirection="row"
        justifyContent={!searchTerm ? 'center' : 'flex-end'}
        alignItems="center"
      >
        {!searchTerm ? (
          <Typography sx={{ mb: -1, color: 'hintText.main' }} variant="subtitle1" fontSize={10}>
            TOP TRENDING POSTS
          </Typography>
        ) : (
          <Box display="flex" alignItems="center">
            <ErrorOutlineIcon sx={{ fontSize: '0.9rem', color: 'hintText.main', mr: 0.5 }} />
            <Typography sx={{ color: 'hintText.main' }} fontSize={12}>
              Enter to search for post
            </Typography>
          </Box>
        )}
      </Stack>
      {searchTerm && <Divider />}
      <Box {...props}></Box>
    </Box>
  )
}

/**
 * The container that wrap all the list item with the same "groupBy"
 */
export const renderGroup = (params: AutocompleteRenderGroupParams) => {
  return (
    <Stack {...params} key={`top_search_group_${rid()}`}>
      {params.group !== 'Not Found' && params.group !== 'Top trending' && (
        <ListSubheader sx={{ pt: 1, pb: 1 }} disableSticky key={`top_search_group_${rid()}`}>
          <Typography variant="subtitle1" fontSize={10}>
            {params.group?.toUpperCase()}
          </Typography>
        </ListSubheader>
      )}
      <Stack key={`top_search_group_${rid()}`}>{params.children}</Stack>
    </Stack>
  )
}

/**
 * The Option item (atom element)
 */
export const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: TAutocompleteOptions): ReactNode => {
  const isPost = isQueriedTrending(option)
  const isSub = isQueriedSub(option)
  const isUser = isQueriedUser(option)
  const isNF = isNotFound(option)
  const url = !isNF ? generateAutoCompleteUrl(option) : ''

  return (
    // use Link only for prefetch functionality, disable navigation on click
    <Fragment key={`search_result_${rid()}`}>
      {!isNF ? (
        <>
          {isPost && (
            /* Top trending posts options */
            <TopTrendingOption option={option} props={props} url={url} />
          )}
          {(isSub || isUser) && (
            /* Communities and people options  */
            <QueriedSubUserOption option={option} props={props} url={url} />
          )}
        </>
      ) : (
        <NotFoundOption option={option} props={props} />
      )}
    </Fragment>
  )
}
