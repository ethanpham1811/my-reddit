import { OutboundOutlinedIcon } from '@/constants/icons'
import { TAutocompleteOptions } from '@/constants/types'
import {
  formatNumber,
  generateAutoCompleteUrl,
  generateSeededHexColor,
  generateUserImage,
  isNotFound,
  isQueriedSub,
  isQueriedTrending,
  isQueriedUser
} from '@/services'
import { AutocompleteRenderGroupParams, Avatar, Box, Divider, ListItem, ListSubheader, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes, ReactNode } from 'react'
import { v4 as rid } from 'uuid'

export const renderGroup = (params: AutocompleteRenderGroupParams) => {
  return (
    <li {...params}>
      {params.group !== 'Not Found' && (
        <ListSubheader sx={{ pt: 1.5, pb: 1 }} disableSticky>
          <Typography variant="subtitle1" fontSize={10}>
            {params.group?.toUpperCase()}
          </Typography>
        </ListSubheader>
      )}
      <Stack>{params.children}</Stack>
    </li>
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
    <>
      {!isNF ? (
        <Link href={url} onClick={(e) => e.preventDefault()} key={`search_result_${rid()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {isPost && (
            /* Posts options */
            <ListItem
              {...props}
              sx={{ '&.MuiListItem-root': { py: 1.5, gap: 2, alignItems: 'flex-start' }, '&:hover': { bgcolor: 'inputBgOutfocused.main' } }}
            >
              <Box pt={0.6}>
                <OutboundOutlinedIcon sx={{ color: 'blue.main', fontSize: '1.5rem' }} />
              </Box>
              <Stack flex={1}>
                <Typography color="black" fontSize="1.1rem">
                  {option.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'hintText.main' }}>
                  {option.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'blue.main' }}>
                  r/{option.subreddit?.name}
                </Typography>
              </Stack>
              <Box>
                <Box borderRadius="0.3rem" bgcolor={generateSeededHexColor(option.title)}>
                  <Image alt="post image" src={generateUserImage(option.title)} style={{ objectFit: 'cover' }} width={100} height={70} />
                </Box>
              </Box>
              <Divider />
            </ListItem>
          )}
          {(isSub || isUser) && (
            /* Communities options  */
            <ListItem
              {...props}
              sx={{ '&.MuiListItem-root': { gap: 2, alignItems: 'flex-start' }, '&:hover': { bgcolor: 'inputBgOutfocused.main' } }}
            >
              <Box pt={0.6}>
                <Avatar
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: generateSeededHexColor(isSub ? option.name : option.username)
                  }}
                  alt={isSub ? option.name : option.username}
                  src={generateUserImage(isSub ? option.name : option.username)}
                />
              </Box>
              <Stack>
                <Typography>r/{isSub ? option.name : option.username}</Typography>
                <Typography variant="caption" sx={{ color: 'hintText.main' }}>
                  {isSub && `Community • ${formatNumber(option.member)} members`}
                  {!isSub && `User • ${formatNumber(option.followers)} followers`}
                </Typography>
              </Stack>
            </ListItem>
          )}
        </Link>
      ) : (
        <ListItem
          onClick={(e) => e.stopPropagation()}
          {...props}
          sx={{
            '&.MuiListItem-root': { cursor: 'auto', gap: 2, alignItems: 'flex-start', '&.Mui-focused': { backgroundColor: 'inherit' } },
            '&:hover': { bgcolor: 'inputBgOutfocused.main' }
          }}
        >
          <Typography>{option.text}</Typography>
        </ListItem>
      )}
    </>
  )
}

// export const getOptionLabel = (option: TQueriedTrending | TPopularSub | string): string => {
//   return typeof option === 'string' ? option : isQueriedTrending(option) ? option.title : option.name
// }
