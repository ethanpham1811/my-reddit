import { ListSubheader, Typography } from '@/mui'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { createElement } from 'react'

type TProfileGroupHeaderProps = {
  label: string
  groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
function ProfileGroupHeader({ label, groupIcon }: TProfileGroupHeaderProps) {
  return (
    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'hintText.main' }}>
        {createElement(groupIcon)}
        {label}
      </Typography>
    </ListSubheader>
  )
}

export default ProfileGroupHeader
