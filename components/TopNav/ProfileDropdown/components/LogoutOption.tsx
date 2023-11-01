import { LogoutIcon } from '@/constants/icons'
import { MenuItem } from '@mui/material'

type TLogoutOptionProps = {
  value: string
  onClick: () => void
}
function LogoutOption({ ...rest }: TLogoutOptionProps) {
  return (
    <MenuItem
      sx={{
        '&.MuiButtonBase-root': { fontWeight: 600, justifyContent: 'flex-end', color: 'orange.main', '&:hover': { bgcolor: 'primary.main' } }
      }}
      {...rest}
    >
      Logout
      <LogoutIcon />
    </MenuItem>
  )
}

export default LogoutOption
