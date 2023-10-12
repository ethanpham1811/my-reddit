import { MAIN_MENU_GROUP } from '@/constants/enums'
import { ListSubheader, Typography } from '@mui/material'

function MenuGroupHeader({ label }: { label: MAIN_MENU_GROUP }) {
  return (
    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
      <Typography variant="subtitle1" sx={{ color: 'hintText.main' }}>
        {label.toUpperCase()}
      </Typography>
    </ListSubheader>
  )
}

export default MenuGroupHeader
