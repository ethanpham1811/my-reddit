import { KeyboardArrowDownIcon } from '@/constants'
import { Box, FormControl, Select, SelectChangeEvent } from '@mui/material'
import { Dispatch, JSX, ReactNode, SetStateAction } from 'react'

type RdDropdownProps = {
  children: JSX.Element | JSX.Element[]
  renderSelectedOption: (jsx: ReactNode) => ReactNode
  selectedKey: string
  setSelectedKey: Dispatch<SetStateAction<string>>
}

function RdDropdown({ children, renderSelectedOption, selectedKey, setSelectedKey }: RdDropdownProps) {
  const handleChange = (e: SelectChangeEvent<string>) => setSelectedKey(e.target.value)

  return (
    <Box flex={1}>
      <FormControl sx={{ m: 1, minWidth: 200, margin: 0 }} fullWidth>
        <Select
          value={selectedKey}
          onChange={handleChange}
          IconComponent={(props): ReactNode => <KeyboardArrowDownIcon {...props} />}
          renderValue={renderSelectedOption}
          sx={{
            '.MuiSelect-select': {
              padding: '0.5rem',
              textTransform: 'none',
              alignItems: 'center',
              display: 'flex',
              gap: '0.5rem'
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent'
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': { borderColor: (theme) => theme.palette.primary.main }
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
                  padding: '0.3rem 1rem',
                  justifyContent: 'flex-start',
                  gap: '0.5rem',
                  fontStyle: 'normal'
                }
              }
            }
          }}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  )
}

export default RdDropdown
