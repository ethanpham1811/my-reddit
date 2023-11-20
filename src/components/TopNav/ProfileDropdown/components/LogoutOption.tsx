import { LogoutIcon } from '@/src/constants/icons'
import { MenuItem } from '@/src/mui'

type TLogoutOptionProps = {
  value: string
  onClick: () => void
}
function LogoutOption({ ...rest }: TLogoutOptionProps) {
  return (
    <MenuItem
      tabIndex={0}
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
