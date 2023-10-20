import { KeyboardArrowDownIcon } from '@/constants/icons'
import { TRdDropdownProps } from '@/constants/types'
import { Box, Select } from '@mui/material'
import { ReactNode } from 'react'

function RdDropdown({
  sx,
  flex,
  width,
  maxWidth,
  minWidth,
  borderColor,
  children,
  mobileMode,
  offsetTop,
  offsetBot,
  onChange,
  renderSelectedOption,
  ...rest
}: TRdDropdownProps) {
  return (
    <Box
      flex={flex}
      sx={{
        width: { xs: mobileMode ? 'auto' : width, lg: width },
        maxWidth: { xs: mobileMode ? 'auto' : maxWidth, lg: maxWidth },
        minWidth: { xs: mobileMode ? 'auto' : minWidth, lg: minWidth },
        ...sx
      }}
    >
      <Select
        onChange={onChange}
        displayEmpty
        IconComponent={(props): ReactNode => <KeyboardArrowDownIcon {...props} />}
        renderValue={renderSelectedOption}
        sx={{
          flex: 1,
          display: 'flex',
          fontWeight: 'medium',
          '.MuiSelect-select': {
            p: 1,
            gap: 1,
            textTransform: 'none',
            alignItems: 'center',
            display: 'flex'
          },
          fieldset: {
            borderColor: `${borderColor ?? 'white'}.main`
          },
          '&:hover': {
            fieldset: { borderColor: 'primary.main' }
          },
          '&.Mui-focused': {
            fieldset: { borderWidth: '1px !important' },
            '[aria-expanded=true]': {
              '~ fieldset': { borderBottomColor: offsetTop ? 'primary.main' : 'none', borderWidth: '1px' }
            }
          }
        }}
        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            sx: {
              mt: offsetTop,
              mb: offsetBot,
              boxShadow: 2,
              '& .MuiMenuItem-root': {
                gap: 1,
                justifyContent: 'flex-start',
                fontStyle: 'normal',
                img: {
                  mt: '-5px'
                }
              }
            }
          }
        }}
        {...rest}
      >
        {children}
      </Select>
    </Box>
  )
}

export default RdDropdown
