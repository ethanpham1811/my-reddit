import { MAIN_MENU_GROUP } from '@/src/constants/enums'
import { ListSubheader, Typography } from '@/src/mui'

function MenuGroupHeader({ label }: { label: MAIN_MENU_GROUP }) {
  return (
    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
      <Typography variant="subtitle1" sx={{ color: 'gray.dark' }}>
        {label.toUpperCase()}
      </Typography>
    </ListSubheader>
  )
}

export default MenuGroupHeader
