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
      <FormControl sx={{ m: 0, minWidth: 200 }} fullWidth>
        <Select
          value={selectedKey}
          onChange={handleChange}
          IconComponent={(props): ReactNode => <KeyboardArrowDownIcon {...props} />}
          renderValue={renderSelectedOption}
          sx={{
            fontWeight: 'medium',
            '.MuiSelect-select': {
              p: 1,
              textTransform: 'none',
              alignItems: 'center',
              display: 'flex',
              gap: 1
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent'
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
      </FormControl>
    </Box>
  )
}

export default RdDropdown
