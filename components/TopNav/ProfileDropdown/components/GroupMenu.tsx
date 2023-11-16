import { DarkModeContext } from '@/components/Layouts/MuiProvider'
import { PROFILE_DIALOG_TYPE, PROFILE_MENU_OPTION_TYPE, PROFILE_MENU_OPTION_VALUE } from '@/constants/enums'
import { TProfileDropDownList } from '@/constants/types'
import { Divider, MenuItem, Stack, Switch } from '@/mui'
import { Events, eventEmitter } from '@/src/eventEmitter'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { useRouter } from 'next/router'
import { Dispatch, Fragment, KeyboardEvent, MouseEvent, SetStateAction, createElement, useContext } from 'react'
import ProfileGroupHeader from './ProfileGroupHeader'

type TProfileMenuProps = {
  group: string
  groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  menuItems: TProfileDropDownList[]
  setDialogType: Dispatch<SetStateAction<PROFILE_DIALOG_TYPE>>
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  key: string
}

function GroupMenu({ group, groupIcon, menuItems, setDialogType, setIsOpenDialog, key: groupKey, ...rest }: TProfileMenuProps) {
  const { toggleDarkMode } = useContext(DarkModeContext)
  const { push: navigate } = useRouter()

  /* fire event to open create community drawer (only for Create Community Option) */
  function openCreateCommunityDrawer() {
    eventEmitter.dispatch(Events.OPEN_CREATE_COMMUNITY_DRAWER, true)
  }

  /* menu actions */
  function handleMenuActions(
    e: KeyboardEvent<HTMLLIElement> | MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    type: PROFILE_MENU_OPTION_TYPE,
    i: number
  ): void {
    if (e.type !== 'click' && 'key' in e && e.key !== 'Enter') return

    const { url, value, dialog } = menuItems[i]

    switch (type) {
      case PROFILE_MENU_OPTION_TYPE.Link:
        url && navigate(url)
        break
      case PROFILE_MENU_OPTION_TYPE.Event:
        value === PROFILE_MENU_OPTION_VALUE.createCommunity && openCreateCommunityDrawer()
        break
      case PROFILE_MENU_OPTION_TYPE.Modal:
        if (dialog) {
          setDialogType(dialog)
          setIsOpenDialog(true)
        }
        break
      case PROFILE_MENU_OPTION_TYPE.Switcher:
        e.stopPropagation()
        value === PROFILE_MENU_OPTION_VALUE.mode && toggleDarkMode()
        break
    }
  }

  return (
    <Fragment key={groupKey}>
      <ProfileGroupHeader label={group} groupIcon={groupIcon} />
      {menuItems.map(({ name, type, switcher, key, disabled, checked }, i) => (
        <MenuItem
          tabIndex={0}
          disabled={disabled}
          onKeyDown={(e) => handleMenuActions(e, type, i)}
          sx={{
            ml: 'calc(1em + 1rem)',
            minHeight: 'auto',
            '&:hover': switcher ? { bgcolor: 'transparent' } : {},
            '&.MuiButtonBase-root': { p: 0 }
          }}
          key={key}
          {...rest}
        >
          <Stack
            onClick={(e) => handleMenuActions(e, type, i)}
            direction="row"
            sx={{ alignItems: 'center', p: '6px 16px', display: 'flex', flex: '1' }}
          >
            {name || 'unknown'}
            {switcher &&
              createElement(Switch, {
                checked,
                sx: {
                  zIndex: 10,
                  ml: 'auto',
                  position: 'absolute',
                  right: '1rem',
                  '.Mui-checked': { '.MuiSwitch-thumb': { color: 'orange.main' }, '&+.MuiSwitch-track': { opacity: 1 } }
                }
              })}
          </Stack>
        </MenuItem>
      ))}
      <Divider />
    </Fragment>
  )
}

export default GroupMenu
