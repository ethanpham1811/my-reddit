import { notificationsLabel } from '@/components/utilities'
import { AddSharpIcon, CampaignOutlinedIcon, NotificationsOutlinedIcon, OutboundOutlinedIcon, SmsOutlinedIcon } from '@/constants'
import { Badge, Box, IconButton, useTheme } from '@mui/material'

function IconBox() {
  const theme = useTheme()
  return (
    <Box flex={1}>
      <IconButton size="large" sx={{ color: theme.palette.icon.main }} aria-label={notificationsLabel(100)}>
        <Badge badgeContent={17} sx={{ '.MuiBadge-badge': { fontSize: '0.5rem' } }} color="error" max={99}>
          <OutboundOutlinedIcon />
        </Badge>
      </IconButton>
      <IconButton size="large" sx={{ color: theme.palette.icon.main }} aria-label={notificationsLabel(100)}>
        <Badge badgeContent={1447} sx={{ '.MuiBadge-badge': { fontSize: '0.5rem' } }} color="error" max={99}>
          <SmsOutlinedIcon />
        </Badge>
      </IconButton>
      <IconButton size="large" sx={{ color: theme.palette.icon.main }} aria-label={notificationsLabel(100)}>
        <Badge badgeContent={17} sx={{ '.MuiBadge-badge': { fontSize: '0.5rem' } }} color="error" max={99}>
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
      <IconButton size="large" sx={{ color: theme.palette.icon.main }} aria-label={notificationsLabel(100)}>
        <Badge badgeContent={17} sx={{ '.MuiBadge-badge': { fontSize: '0.5rem' } }} color="error" max={99}>
          <AddSharpIcon />
        </Badge>
      </IconButton>

      <IconButton size="large" sx={{ color: theme.palette.icon.main }} aria-label={notificationsLabel(100)}>
        <Badge badgeContent={4} sx={{ '.MuiBadge-badge': { fontSize: '0.5rem' } }} color="error" max={99}>
          <CampaignOutlinedIcon />
        </Badge>
      </IconButton>
      {/* <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        // aria-controls={menuId}
        aria-haspopup="true"
        // onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton> */}
    </Box>
  )
}

export default IconBox
