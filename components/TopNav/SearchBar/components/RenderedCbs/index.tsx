import { TAutocompleteOptions } from '@/constants/types'
import { isNotFound, isQueriedSub, isQueriedTrending, isQueriedUser } from '@/src/typeCheck'
import { generateAutoCompleteUrl } from '@/src/utils'
import { AutocompleteRenderGroupParams, ListSubheader, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { Fragment, HTMLAttributes, ReactNode } from 'react'
import { v4 as rid } from 'uuid'
import NotFoundOption from '../NotFoundOption'
import QueriedSubUserOption from '../QueriedSubUserOption'
import TopTrendingOption from '../TopTrendingOption'

export const renderGroup = (params: AutocompleteRenderGroupParams) => {
  return (
    <Stack {...params} key={`top_search_group_${rid()}`}>
      {params.group !== 'Not Found' && (
        <ListSubheader sx={{ pt: 1.5, pb: 1 }} disableSticky key={`top_search_group_${rid()}`}>
          <Typography variant="subtitle1" fontSize={10}>
            {params.group?.toUpperCase()}
          </Typography>
        </ListSubheader>
      )}
      <Stack key={`top_search_group_${rid()}`}>{params.children}</Stack>
    </Stack>
  )
}

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
        <Link href={url} onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>
          {isPost && (
            /* Top trending posts options */
            <TopTrendingOption option={option} props={props} />
          )}
          {(isSub || isUser) && (
            /* Communities and people options  */
            <QueriedSubUserOption option={option} props={props} />
          )}
        </Link>
      ) : (
        <NotFoundOption option={option} props={props} />
      )}
    </Fragment>
  )
}
