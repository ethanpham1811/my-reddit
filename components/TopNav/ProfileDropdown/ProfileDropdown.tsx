import { CardLogout, RdDialog, RdDropdown } from '@/components'
import CardUserAgreement from '@/components/Cards/CardUserAgreement/CardUserAgreement'
import { PROFILE_DIALOG_TYPE } from '@/constants/enums'
import { AccountCircleOutlinedIcon, InfoOutlinedIcon, LogoutIcon, PreviewOutlinedIcon } from '@/constants/icons'
import { TProfileDropdownProps, TSession } from '@/constants/types'
import { createGroupedList } from '@/services'
import { Box, Divider, List, MenuItem, Stack, SvgIconTypeMap, Switch, Typography } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { createElement, useState } from 'react'
import { v4 as rid } from 'uuid'
import { renderSelectedOption } from './RenderedCbs'
import ProfileGroupHeader from './components/ProfileGroupHeader'

type TProfileDropDownList = {
  name: string
  value: string
  switcher?: boolean
  url?: string
  groupBy: string
  disabled?: boolean
  dialog?: PROFILE_DIALOG_TYPE
  groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}

function ProfileDropdownProp({ navigate }: TProfileDropdownProps) {
  // const [page, setPage] = useState('home')
  const { data: session }: TSession = useSession()
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState(PROFILE_DIALOG_TYPE.Logout)
  const user = session?.user

  const menuList: TProfileDropDownList[] = [
    {
      name: 'Profile',
      value: 'profile',
      url: `/u/${user?.name}`,
      groupBy: 'My Space',
      groupIcon: AccountCircleOutlinedIcon
    },
    {
      name: 'Online Status',
      value: 'status',
      switcher: true,
      groupBy: 'My Space',
      disabled: true,
      groupIcon: AccountCircleOutlinedIcon
    },
    {
      name: 'Dark Mode',
      value: 'mode',
      switcher: true,
      groupBy: 'View Options',
      disabled: true,
      groupIcon: PreviewOutlinedIcon
    },
    {
      name: 'User Agreement',
      value: 'User Agreement',
      groupBy: 'Terms & Policies',
      dialog: PROFILE_DIALOG_TYPE.UserAgreement,
      groupIcon: InfoOutlinedIcon
    }
  ]

  const groupedMenuList = createGroupedList(menuList)
  return (
    <>
      <RdDropdown
        flex={1}
        mobileMode
        offsetTop="10px"
        minWidth="200px"
        borderColor="inputBorder"
        renderSelectedOption={(_) => renderSelectedOption(_, user)}
      >
        {session && groupedMenuList.length > 0 ? (
          groupedMenuList.map(({ items, group, groupIcon }) => {
            return (
              <List key={`profile_menu_${rid()}`}>
                <ProfileGroupHeader label={group} groupIcon={groupIcon} />
                {items.map(({ name, switcher, url, disabled, dialog }) => (
                  <MenuItem
                    disabled={disabled}
                    key={`profile_menu_item_${rid()}`}
                    sx={{ '&:hover, &:focus': switcher ? { bgcolor: 'transparent' } : {}, ml: 'calc(1em + 1rem)', '&.MuiButtonBase-root': { p: 0 } }}
                  >
                    {url ? (
                      <Link
                        href={url}
                        style={{
                          padding: '6px 16px',
                          display: 'flex',
                          flex: '1',
                          textDecoration: 'none',
                          color: 'unset'
                        }}
                      >
                        {name || 'unknown'}
                      </Link>
                    ) : (
                      <Stack
                        onClick={() => {
                          if (!dialog) return
                          setDialogType(PROFILE_DIALOG_TYPE.UserAgreement)
                          setIsOpenDialog(true)
                        }}
                        direction="row"
                        sx={{ alignItems: 'center', p: '6px 16px', display: 'flex', flex: '1' }}
                      >
                        {name || 'unknown'}
                        {switcher &&
                          createElement(Switch, { sx: { ml: 'auto', '.Mui-checked+.MuiSwitch-track': { opacity: 1, bgcolor: 'orange.main' } } })}
                      </Stack>
                    )}
                  </MenuItem>
                ))}
                <Divider />
              </List>
            )
          })
        ) : (
          <div></div>
        )}
        <MenuItem
          sx={{
            '&.MuiButtonBase-root': { fontWeight: 600, justifyContent: 'flex-end', color: 'orange.main', '&:hover': { bgcolor: 'primary.main' } }
          }}
          onClick={(e) => {
            setIsOpenDialog(true)
            setDialogType(PROFILE_DIALOG_TYPE.Logout)
          }}
        >
          Logout
          <LogoutIcon />
        </MenuItem>
        {/* <LogoutOption setIsOpenDialog={setIsOpenDialog} setDialogType={setDialogType} /> */}
        <Box px={2}>
          <Typography variant="caption" sx={{ color: 'hintText.main' }}>
            Ethan Reddit, Inc. © 2023. All rights reserved.
          </Typography>
        </Box>
      </RdDropdown>

      <RdDialog open={isOpenDialog} setOpen={setIsOpenDialog}>
        {dialogType === PROFILE_DIALOG_TYPE.Logout && <CardLogout setOpen={setIsOpenDialog} />}
        {dialogType === PROFILE_DIALOG_TYPE.UserAgreement && <CardUserAgreement setOpen={setIsOpenDialog} />}
      </RdDialog>
    </>
  )
}

export default ProfileDropdownProp
