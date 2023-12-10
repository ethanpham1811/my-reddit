import { ListSubheader, Typography } from '@/src/mui'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { createElement } from 'react'

type TProfileGroupHeaderProps = {
  label: string
  groupIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
function ProfileGroupHeader({ label, groupIcon }: TProfileGroupHeaderProps) {
  return (
    <ListSubheader sx={{ bgcolor: 'background.paper', py: '0.3rem', mb: '5px' }}>
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'gray.dark' }}>
        {createElement(groupIcon)}
        {label}
      </Typography>
    </ListSubheader>
  )
}

export default ProfileGroupHeader
