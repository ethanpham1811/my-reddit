import { PROFILE_DIALOG_TYPE } from '@/constants/enums'
import { LogoutIcon } from '@/constants/icons'
import { MenuItem } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

type TLogoutOptionProps = {
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  setDialogType: Dispatch<SetStateAction<PROFILE_DIALOG_TYPE>>
}
function LogoutOption({ setIsOpenDialog, setDialogType }: TLogoutOptionProps) {
  return (
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
  )
}

export default LogoutOption
