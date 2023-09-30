import { KeyboardArrowDownIcon } from '@/constants/icons'
import { Box, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material'
import { JSX, ReactNode } from 'react'

type TRdDropdownProps = {
  children: JSX.Element | JSX.Element[]
  renderSelectedOption: (value: string) => ReactNode
  value: string
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  width?: string
  flex?: number
  loading: boolean
  placeholder?: string
  borderColor?: string
  sx?: SxProps<Theme>
}

function RdDropdown({ flex, width, placeholder, loading, borderColor, children, sx, renderSelectedOption, value, onChange }: TRdDropdownProps) {
  return (
    <Box flex={flex} sx={{ width, ...sx }}>
      <Select
        value={value}
        placeholder={placeholder}
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
      >
        {children}
      </Select>
    </Box>
  )
}

export default RdDropdown
