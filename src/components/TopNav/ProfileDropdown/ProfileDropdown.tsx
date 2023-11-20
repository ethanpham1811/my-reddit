import { useAppSession } from '@/src/Layouts/MainLayout'
import { useDarkMode } from '@/src/Layouts/MuiProvider'
import { CardLogout, RdDialog, RdDropdown } from '@/src/components'
import CardUserAgreement from '@/src/components/Cards/CardUserAgreement/CardUserAgreement'
import { DARK_MODE, PROFILE_DIALOG_TYPE } from '@/src/constants/enums'
import { TProfileDropDownList, TProfileDropdownGroupedList } from '@/src/constants/types'
import { Box, Divider, Typography } from '@/src/mui'
import { createGroupedList } from '@/src/services/utils'
import { ReactNode, useState } from 'react'
import { v4 as rid } from 'uuid'
import { buildProfileMenuData } from '../data'
import { renderSelectedOption } from './RenderedCbs'
import GroupMenu from './components/GroupMenu'
import LogoutOption from './components/LogoutOption'

type TProfileDropdownProps = {
  loading: boolean
  isMobile: boolean
  sessionUsername: string | undefined
}
function ProfileDropdownProp({ isMobile, loading, sessionUsername }: TProfileDropdownProps) {
  const { mode } = useDarkMode()
  const { session } = useAppSession()
  const me = session?.userDetail
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState(PROFILE_DIALOG_TYPE.Logout)

  // Build grouped menu data
  const menuList: TProfileDropDownList[] = buildProfileMenuData(me?.username, { darkMode: mode !== DARK_MODE.light })
  const groupedMenuList: TProfileDropdownGroupedList[] = createGroupedList(menuList)

  function handleRenderSelectedOption(_: string): ReactNode {
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
          <Box mb={1}>
            <Box px={2} mb={1} textAlign="right">
              <Typography>{me.username}</Typography>
            </Box>
            <Divider />
          </Box>
        )}

        {/* Menu main options */}
        {me && groupedMenuList.length > 0 ? (
          groupedMenuList.map(({ items, group, groupIcon }) => {
            return (
              <GroupMenu
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
