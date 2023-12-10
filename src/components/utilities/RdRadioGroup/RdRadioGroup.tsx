import { FormControl, FormControlLabel, FormLabel, Radio } from '@/src/mui'
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup'
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { v4 as rid } from 'uuid'

import { TRadioOption } from '@/src/constants/types'
import { Box, Stack, Typography } from '@mui/material'
import { ReactNode, createElement } from 'react'

type TRdRadioGroupProps<T extends FieldValues> = RadioGroupProps & {
  name: FieldPath<T>
  control: Control<T>
  options: TRadioOption[]
  label: string | ReactNode
  registerOptions?: RegisterOptions
}

const RdRadioGroup = <T extends FieldValues>({ sx, options, name, control, label, registerOptions }: TRdRadioGroupProps<T>) => {
  return (
    <FormControl>
      <FormLabel id={`${name}-radio-group`} sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        rules={registerOptions}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            sx={{
              '.MuiButtonBase-root': {
                alignSelf: { xs: 'flex-start', sm: 'center' },
                pt: { xs: '2px', sm: '9px' }
              },
              gap: { xs: 1, sm: 0 },
              ...sx
            }}
            onChange={onChange}
            value={value}
            aria-labelledby={`${name} radio group`}
            name={`${name}-radio-group`}
          >
            {options.map(({ value: itemValue, label, icon, description, disabled }: TRadioOption) => (
              <FormControlLabel
                key={`option_${rid()}`}
                value={itemValue}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onChange(itemValue)}
                control={<Radio sx={{ '&.Mui-checked': { color: 'unset' } }} />}
                label={
                  <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                    <Stack direction="row">
                      {createElement(icon, { sx: { mr: 1 } })}
                      <Typography variant="body1" fontWeight={600} component="span">
                        {label}
                      </Typography>
                    </Stack>
                    <Box style={{ padding: '0 0.5rem' }} display={{ xs: 'none', sm: 'block' }}>
                      •
                    </Box>
                    <Typography variant="body1" sx={{ color: 'gray.dark' }}>
                      {description}
                    </Typography>
                  </Stack>
                }
                disabled={disabled}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  )
}
export default RdRadioGroup
