import { ColorModeContext } from '@/components/Layouts/MuiLayout'
import { PROFILE_DIALOG_TYPE } from '@/constants/enums'
import { TProfileDropDownList } from '@/constants/types'
import { Events, eventEmitter } from '@/src/eventEmitter'
import { Divider, List, MenuItem, Stack, SvgIconTypeMap, Switch } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import Link from 'next/link'
import { Dispatch, SetStateAction, createElement, useContext } from 'react'
import { v4 as rid } from 'uuid'
import ProfileGroupHeader from '../components/ProfileGroupHeader'

type TProfileMenuProps = {
  group: string
  groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  menuItems: TProfileDropDownList[]
  setDialogType: Dispatch<SetStateAction<PROFILE_DIALOG_TYPE>>
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}

function ProfileMenu({ group, groupIcon, menuItems, setDialogType, setIsOpenDialog, ...rest }: TProfileMenuProps) {
  const { toggleColorMode } = useContext(ColorModeContext)

  /* fire event to open create community drawer (only for Create Community Option) */
  function onCreateCommunity() {
    eventEmitter.dispatch(Events.OPEN_CREATE_COMMUNITY_DRAWER, true)
  }

  /* fire event to open create community drawer (only for Create Community Option) */
  function onSwitchDarkMode() {
    toggleColorMode()
  }

  return (
    <List key={`profile_menu_${rid()}`}>
      <ProfileGroupHeader label={group} groupIcon={groupIcon} />
      {menuItems.map(({ name, value, switcher, url, disabled, dialog, onClick, checked }) => (
        <MenuItem
          disabled={disabled}
          key={`profile_menu_item_${rid()}`}
          sx={{ '&:hover, &:focus': switcher ? { bgcolor: 'transparent' } : {}, ml: 'calc(1em + 1rem)', '&.MuiButtonBase-root': { p: 0 } }}
          {...rest}
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
              onClick={(e) => {
                if (onClick) {
                  value === 'createCommunity' && onCreateCommunity()
                }
                if (switcher) {
                  e.stopPropagation()
                  value === 'mode' && onSwitchDarkMode()
                }

                if (dialog) {
                  setDialogType(PROFILE_DIALOG_TYPE.UserAgreement)
                  setIsOpenDialog(true)
                }
              }}
              direction="row"
              sx={{ alignItems: 'center', p: '6px 16px', display: 'flex', flex: '1' }}
            >
              {name || 'unknown'}
              {switcher &&
                createElement(Switch, {
                  checked,
                  sx: {
                    ml: 'auto',
                    '.Mui-checked': { '.MuiSwitch-thumb': { color: 'orange.main' }, '&+.MuiSwitch-track': { opacity: 1 } }
                  }
                })}
            </Stack>
          )}
        </MenuItem>
      ))}
      <Divider />
    </List>
  )
}

export default ProfileMenu
