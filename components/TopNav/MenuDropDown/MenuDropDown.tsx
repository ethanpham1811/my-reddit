import { RdDropdown } from '@/components'
import { RdSkeleton } from '@/components/Skeletons'
import { generateSeededHexColor, generateUserImage } from '@/components/utilities'
import { MAIN_MENU_GROUP } from '@/constants/enums'
import { HomeIcon } from '@/constants/icons'
import { TMenuDropdownProps, TMenuItem } from '@/constants/types'
import { Avatar, Box, List, ListItemText, ListSubheader, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { createElement } from 'react'
import { v4 as rid } from 'uuid'

function MenuDropDown({ session, subListData, subOrUserId, pathName }: TMenuDropdownProps) {
  const { subredditList, loading, error } = subListData
  const activePage: string = pathName === '/' ? 'Home' : (subOrUserId as string)

  const feedsOptions: TMenuItem[] = [
    {
      name: 'Home',
      icon: HomeIcon,
      group: MAIN_MENU_GROUP.Feeds
    }
  ]
  const communityOptions: TMenuItem[] | [] = subredditList
    ? subredditList.map(({ name }): TMenuItem => {
        return { name, group: MAIN_MENU_GROUP.Communities }
      })
    : []

  function renderSelectedOption() {
    const compositeMenu = [...feedsOptions, ...communityOptions]
    const selectedMenu = compositeMenu.find((option) => option.name == activePage)
    return (
      <>
        {selectedMenu ? (
          <>
            {selectedMenu.icon ? (
              createElement(selectedMenu.icon)
            ) : (
              <Avatar
                variant="rounded"
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: generateSeededHexColor(selectedMenu.name),
                  border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
                }}
                alt={`${selectedMenu.name} avatar`}
                src={generateUserImage(selectedMenu.name)}
              />
            )}
            <Box sx={{ display: { xs: 'none', lg: 'block' } }} display="block" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
              {`${subOrUserId ? 'r/' : ''}${selectedMenu.name}` || 'unknown'}
            </Box>
          </>
        ) : (
          <div></div>
        )}
      </>
    )
  }

  return (
    <RdDropdown renderSelectedOption={renderSelectedOption} value={activePage} flex={1} width="20vw" maxWidth="250px" minWidth="50px" mobileMode>
      <List>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          <Typography variant="subtitle1" sx={{ color: 'hintText.main' }}>
            {MAIN_MENU_GROUP.Feeds.toUpperCase()}
          </Typography>
        </ListSubheader>
        {feedsOptions.map(({ name, icon }) => (
          <Link href="/" style={{ color: 'unset', textDecoration: 'none' }} key={`feeds_menu_${rid()}`}>
            <MenuItem value={name}>
              {icon && createElement(icon)}
              <ListItemText primary={name} />
            </MenuItem>
          </Link>
        ))}
      </List>
      <List>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          <Typography variant="subtitle1" sx={{ color: 'hintText.main' }}>
            {MAIN_MENU_GROUP.Communities.toUpperCase()}
          </Typography>
        </ListSubheader>
        {session && !loading ? (
          communityOptions.length > 0 ? (
            communityOptions.map(({ name }) => (
              <Link href={`/r/${name}`} style={{ color: 'unset', textDecoration: 'none' }} key={`communities_menu_${rid()}`}>
                <MenuItem value={name}>
                  <Avatar variant="circular" sx={{ bgcolor: generateSeededHexColor(name), width: 20, height: 20 }}>
                    <Image
                      src={generateUserImage(name)}
                      alt={`community ${name} avatar`}
                      aria-label={`community ${name} avatar`}
                      width={20}
                      height={20}
                    />
                  </Avatar>
                  <ListItemText primary={`r/${name}`} />
                </MenuItem>
              </Link>
            ))
          ) : (
            <MenuItem>
              <ListItemText primary="You didn't join any community"></ListItemText>
            </MenuItem>
          )
        ) : (
          <RdSkeleton />
        )}
      </List>
    </RdDropdown>
  )
}

export default MenuDropDown
