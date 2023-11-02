import { CardLogout, RdDialog, RdDropdown } from '@/components'
import CardUserAgreement from '@/components/Cards/CardUserAgreement/CardUserAgreement'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { PROFILE_DIALOG_TYPE } from '@/constants/enums'
import { createGroupedList } from '@/src/utils'
import { Box, Divider, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import { v4 as rid } from 'uuid'
import { buildProfileMenuData } from '../data'
import { renderSelectedOption } from './RenderedCbs'
import LogoutOption from './components/LogoutOption'
import ProfileMenu from './components/ProfileMenu'

type TProfileDropdownProps = {
  loading: boolean
  isMobile: boolean
  sessionUsername: string | undefined
}
function ProfileDropdownProp({ isMobile, loading, sessionUsername }: TProfileDropdownProps) {
  const { session } = useAppSession()
  const me = session?.userDetail
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState(PROFILE_DIALOG_TYPE.Logout)

  // Build grouped menu data
  const menuList = buildProfileMenuData(me?.username)
  const groupedMenuList = createGroupedList(menuList)

  function handleRenderSelectedOption(value: string): ReactNode {
    return renderSelectedOption(sessionUsername || me?.username, !sessionUsername && loading)
  }

  return (
    <>
      <RdDropdown
        disabled={loading}
        flex={1}
        mobileMode
        value=""
        offsetTop="10px"
        minWidth="200px"
        borderColor="inputBorder"
        renderSelectedOption={handleRenderSelectedOption}
      >
        {/* Display username (mobile only) */}
        {me && isMobile && (
          <Box>
            <Box px={2} pb={1} textAlign="right">
              <Typography>{me.username}</Typography>
            </Box>
            <Divider />
          </Box>
        )}

        {/* Menu main options */}
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

        {/* logout btn */}
        <LogoutOption
          value="logout"
          onClick={() => {
            setIsOpenDialog(true)
            setDialogType(PROFILE_DIALOG_TYPE.Logout)
          }}
        />

        {/* bottom copyrights */}
        <Box px={2}>
          <Typography variant="caption" sx={{ color: 'hintText.main', textWrap: 'nowrap' }}>
            Ethan Reddit, Inc. © 2023. All rights reserved.
          </Typography>
        </Box>
      </RdDropdown>

      {/* Dialog: Logout + UserAgreement */}
      <RdDialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        {dialogType === PROFILE_DIALOG_TYPE.Logout && <CardLogout setOpen={setIsOpenDialog} />}
        {dialogType === PROFILE_DIALOG_TYPE.UserAgreement && <CardUserAgreement setOpen={setIsOpenDialog} />}
      </RdDialog>
    </>
  )
}

export default ProfileDropdownProp
