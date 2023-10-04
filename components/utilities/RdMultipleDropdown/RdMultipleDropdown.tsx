import { KeyboardArrowDownIcon } from '@/constants/icons'
import { TRdMultipleDropdownProps } from '@/constants/types'
import { Box, Select } from '@mui/material'
import { ReactNode, useState } from 'react'

function RdMultipleDropdown({
  flex,
  width,
  borderColor,
  children,
  sx,
  max,
  loading,
  renderSelectedOption,
  onChange,
  ...rest
}: TRdMultipleDropdownProps) {
  const [selectedArray, setSelectedArray] = useState<string[]>([])
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Box flex={flex} sx={{ width, ...sx }}>
      <Select
        value={selectedArray}
        onChange={(e, child) => {
          if (max !== undefined && selectedArray.length >= max) return
          setSelectedArray(e.target.value as string[])
          onChange(e, child)
        }}
        displayEmpty
        open={isOpened}
        disabled={loading}
        multiple
        IconComponent={(props): ReactNode => <KeyboardArrowDownIcon {...props} />}
        renderValue={(value): ReactNode => renderSelectedOption(value, setSelectedArray)}
        onOpen={() => setIsOpened(true)}
        onClose={() => setIsOpened(false)}
        sx={{
          flex: 1,
          display: 'flex',
          fontWeight: 'medium',
          border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`,
          '.MuiSelect-select': {
            p: 0.8,
            gap: 1,
            height: 'calc(1.4375em + 4.2px)',
            textTransform: 'none',
            alignItems: 'center',
            display: 'flex',
            overflow: 'hidden', // Add overflow property
            whiteSpace: 'nowrap', // Add white-space property
            textOverflow: 'ellipsis',
            '.MuiBox-root': {
              flexWrap: 'nowrap',
              overflow: 'hidden'
            }
          },
          fieldset: {
            borderColor: `${borderColor ?? 'white'}.main`
          },
          '&:hover': {
            fieldset: { borderColor: 'primary.main' }
          },
          '&.Mui-focused': {
            fieldset: { borderWidth: '1px' },
            '[aria-expanded=true]': {
              '~ fieldset': { borderBottom: 'none' }
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

export default RdMultipleDropdown
