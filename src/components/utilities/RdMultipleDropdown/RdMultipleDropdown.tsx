import { KeyboardArrowDownIcon } from '@/src/constants/icons'
import { TRdMultipleDropdownProps } from '@/src/constants/types'
import { FormControl, FormHelperText, Select } from '@/src/mui'
import { ReactNode, useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { v4 as rid } from 'uuid'

function RdMultipleDropdown<T extends FieldValues, P extends { id: number }>({
  name,
  control,
  flex,
  borderColor,
  children,
  sx,
  max,
  loading,
  registerOptions,
  renderSelectedOption,
  ...rest
}: TRdMultipleDropdownProps<T, P>) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <FormControl sx={{ flex, display: 'block', width: 'min-content' }}>
      <Controller
        rules={registerOptions}
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              value={value}
              onChange={(e, child) => {
                if (max !== undefined && value.length >= max) return
                onChange(e, child)
              }}
              displayEmpty
              open={isOpened}
              disabled={loading}
              multiple
              IconComponent={(props): ReactNode => <KeyboardArrowDownIcon {...props} />}
              renderValue={renderSelectedOption}
              onOpen={() => setIsOpened(true)}
              onClose={() => setIsOpened(false)}
              sx={{
                display: 'block',
                minWidth: '200px',
                width: 'min-content',
                fontWeight: 'medium',
                border: (theme): string => `1px solid ${theme.palette.primary.dark}`,
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
                  borderWidth: '1px !important',
                  borderColor: `${borderColor ?? 'white'}.main`
                },
                '&:hover': {
                  fieldset: {
                    borderColor: 'primary.main',
                    '&.MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' }
                  }
                },
                '&.Mui-focused': {
                  fieldset: { '&.MuiOutlinedInput-notchedOutline': { borderColor: 'black.main' } },
                  '[aria-expanded=true]': {
                    '~ fieldset': { border: 'none' }
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

            {/* validation message */}
            {error && (
              <FormHelperText id={`helper_${rid()}`} sx={{ color: 'orange.main', mx: 0 }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  )
}

export default RdMultipleDropdown
