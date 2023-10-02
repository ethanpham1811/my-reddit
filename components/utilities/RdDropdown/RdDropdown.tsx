import { KeyboardArrowDownIcon } from '@/constants/icons'
import { TRdDropdownProps } from '@/constants/types'
import { Box, Select } from '@mui/material'
import { ReactNode } from 'react'

function RdDropdown({ flex, width, loading, borderColor, onChange, value, children, sx, renderSelectedOption, ...rest }: TRdDropdownProps) {
  return (
    <Box flex={flex} sx={{ width, ...sx }}>
      <Select
        value={value}
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
            display: 'flex',
            overflow: 'hidden', // Add overflow property
            whiteSpace: 'nowrap', // Add white-space property
            textOverflow: 'ellipsis'
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: `${borderColor ?? 'white'}.main`
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' }
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': { borderWidth: '1px' },
            '[aria-expanded=true]': {
              '~ .MuiOutlinedInput-notchedOutline': { borderBottom: 'none' }
            }
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              boxShadow: 2,
              '& .MuiMenuItem-root': {
                pY: 0.6,
                pX: 2,
                gap: 1,
                justifyContent: 'flex-start',
                fontStyle: 'normal'
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
