import { formatNumber, generateSeededHexColor, generateUserImage, isTopTrending } from '@/components/utilities'
import { OutboundOutlinedIcon } from '@/constants/icons'
import { TPopularSub, TTopTrending } from '@/constants/types'
import { AutocompleteRenderGroupParams, Avatar, Box, Divider, ListItem, ListSubheader, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes, ReactNode } from 'react'
import { v4 as rid } from 'uuid'

export const renderGroup = (params: AutocompleteRenderGroupParams) => {
  return (
    <li {...params}>
      <ListSubheader sx={{ pt: 1.5, pb: 1 }} disableSticky>
        <Typography variant="subtitle1" fontSize={10}>
          {params.group?.toUpperCase()}
        </Typography>
      </ListSubheader>
      <Stack>{params.children}</Stack>
    </li>
  )
}

export const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: TTopTrending | TPopularSub): ReactNode => {
  const isPost = isTopTrending(option)
  const label = isPost ? option.title : option.name
  const url = isPost ? `/p/${option.id}` : `/r/${option.name}`

  return (
    // use Link only for prefetch functionality, disable navigation on click
    <Link href={url} onClick={(e) => e.preventDefault()} key={`search_result_${rid()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      {isPost ? (
        /* Posts options */
        <ListItem
          {...props}
          sx={{ '&.MuiListItem-root': { py: 2, gap: 2, alignItems: 'flex-start' }, '&:hover': { bgcolor: 'inputBgOutfocused.main' } }}
        >
          <Box pt={0.6}>
            <OutboundOutlinedIcon sx={{ color: 'blue.main', fontSize: '1.5rem' }} />
          </Box>
          <Stack flex={1}>
            <Typography color="black" fontSize="1.1rem">
              {label}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'hintText.main' }}>
              {label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'blue.main' }}>
              r/{option.subreddit?.name}
            </Typography>
          </Stack>
          <Box>
            <Box borderRadius="0.3rem" bgcolor={generateSeededHexColor(label)}>
              <Image alt="post image" src={generateUserImage(label)} style={{ objectFit: 'cover' }} width={100} height={70} />
            </Box>
          </Box>
          <Divider />
        </ListItem>
      ) : (
        /* Communities options  */
        <ListItem {...props} sx={{ '&.MuiListItem-root': { gap: 2, alignItems: 'flex-start' }, '&:hover': { bgcolor: 'inputBgOutfocused.main' } }}>
          <Box pt={0.6}>
            <Avatar
              sx={{
                width: 20,
                height: 20,
                backgroundColor: generateSeededHexColor(label)
              }}
              alt={label}
              src={generateUserImage(label)}
            />
          </Box>
          <Stack>
            <Typography>r/{label}</Typography>
            <Typography variant="caption" sx={{ color: 'hintText.main' }}>
              Community • {formatNumber(option.member)} members
            </Typography>
          </Stack>
        </ListItem>
      )}
    </Link>
  )
}

// export const getOptionLabel = (option: TTopTrending | TPopularSub | string): string => {
//   return typeof option === 'string' ? option : isTopTrending(option) ? option.title : option.name
// }
