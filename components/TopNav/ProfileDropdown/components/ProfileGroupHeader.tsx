import { ListSubheader, SvgIconTypeMap, Typography } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { createElement } from 'react'

function ProfileGroupHeader({ label, groupIcon }: { label: string; groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> }) {
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
