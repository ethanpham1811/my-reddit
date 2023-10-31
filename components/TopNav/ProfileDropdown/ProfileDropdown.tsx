import { CardLogout, RdDialog, RdDropdown } from '@/components'
import CardUserAgreement from '@/components/Cards/CardUserAgreement/CardUserAgreement'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { PROFILE_DIALOG_TYPE } from '@/constants/enums'
import { AccountCircleOutlinedIcon, InfoOutlinedIcon, LogoutIcon, PreviewOutlinedIcon } from '@/constants/icons'
import { TProfileDropDownList, TProfileDropdownProps } from '@/constants/types'
import { createGroupedList } from '@/services'
import { Box, Divider, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import { v4 as rid } from 'uuid'
import { renderSelectedOption } from './RenderedCbs'
import ProfileMenu from './components/ProfileMenu'

function ProfileDropdownProp({ isMobile, loading, sessionUsername }: TProfileDropdownProps) {
  // const [page, setPage] = useState('home')
  const { session } = useAppSession()
  const me = session?.userDetail
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState(PROFILE_DIALOG_TYPE.Logout)

  const menuList: TProfileDropDownList[] = [
    {
      name: 'Profile',
      value: 'profile',
      url: `/u/${me?.username}`,
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
        disabled={loading}
        flex={1}
        mobileMode
        offsetTop="10px"
        minWidth="200px"
        borderColor="inputBorder"
        renderSelectedOption={(_) => renderSelectedOption(_, sessionUsername || me?.username, !sessionUsername && loading)}
      >
        {me && isMobile && (
          <>
            <Box px={2} pb={1} textAlign="right">
              <Typography>{me.username}</Typography>
            </Box>
            <Divider />
          </>
        )}
        {me && groupedMenuList.length > 0 ? (
          groupedMenuList.map(({ items, group, groupIcon }) => {
            return (
              <ProfileMenu
                setIsOpenDialog={setIsOpenDialog}
                setDialogType={setDialogType}
                menuItems={items}
                group={group}
                groupIcon={groupIcon}
                key={`profile_menu_group_${rid()}`}
              />
            )
          })
        ) : (
          <Box></Box>
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
          <Typography variant="caption" sx={{ color: 'hintText.main', textWrap: 'nowrap' }}>
            Ethan Reddit, Inc. © 2023. All rights reserved.
          </Typography>
        </Box>
      </RdDropdown>

      <RdDialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        {dialogType === PROFILE_DIALOG_TYPE.Logout && <CardLogout setOpen={setIsOpenDialog} />}
        {dialogType === PROFILE_DIALOG_TYPE.UserAgreement && <CardUserAgreement setOpen={setIsOpenDialog} />}
      </RdDialog>
    </>
  )
}

export default ProfileDropdownProp
