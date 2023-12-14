import { ToggleButton, Typography } from '@/src/mui'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { ToggleButtonProps } from '@mui/material/ToggleButton'
import { createElement } from 'react'

type TSortButtonProps = ToggleButtonProps & {
  disabled: boolean
  label: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}

function SortButton({ disabled, label, icon, ...rest }: TSortButtonProps) {
  return (
    <ToggleButton disabled={disabled} aria-label={label} sx={{ borderRadius: '9999px !important', paddingRight: 1.5, gap: 0.5 }} {...rest}>
      {createElement(icon)}
      <Typography fontWeight={700} textTransform="capitalize">
        {label}
      </Typography>
    </ToggleButton>
  )
}

export default SortButton
