import { TSelectOption } from '@/constants/types'
import { IconButton, IconButtonProps, ListItemText, Menu, MenuItem, Paper, SvgIconTypeMap, Typography } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { createElement, useState } from 'react'
import { v4 as rid } from 'uuid'

type TRdSelect = IconButtonProps & {
  options: TSelectOption[]
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  position?: { top?: string; left?: string; right?: string; bottom?: string }
}

function RdIconSelect({ disabled, options, icon, disableRipple, size, sx, position = {} }: TRdSelect) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const btnId = rid()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        disabled={disabled}
        disableRipple={disableRipple}
        size={size}
        sx={sx}
        id={`rd-select-btn-${btnId}`}
        aria-haspopup="true"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleClick(e)
        }}
      >
        {createElement(icon)}
      </IconButton>
      <Paper sx={{ mt: '0 !important', width: 320, position: 'relative' }}>
        <Menu
          open={open}
          sx={{ ...position }}
          anchorEl={anchorEl}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': `rd-select-btn-${btnId}`
          }}
        >
          {options.map((option: TSelectOption) => (
            <MenuItem
              onClick={() => {
                handleClose()
                option.cb()
              }}
              key={`select_${rid()}`}
            >
              <ListItemText sx={{ minWidth: '5rem' }}>
                <Typography variant="body1">{option.title}</Typography>
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Paper>
    </>
  )
}

export default RdIconSelect
