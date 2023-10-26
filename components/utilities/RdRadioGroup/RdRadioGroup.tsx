import { TRadioOption, TRdRadioGroupProps } from '@/constants/types'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Controller, FieldValues } from 'react-hook-form'
import { v4 as rid } from 'uuid'

import { Box, Stack, Typography } from '@mui/material'
import { createElement } from 'react'

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
              '.MuiButtonBase-root': { alignSelf: { xs: 'flex-start', sm: 'center' }, pt: { xs: '2px', sm: '9px' } },
              gap: { xs: 1, sm: 0 },
              ...sx
            }}
            onChange={onChange}
            value={value}
            aria-labelledby={`${name} radio group`}
            name={`${name}-radio-group`}
          >
            {options.map(({ value, label, icon, description, disabled }: TRadioOption) => (
              <FormControlLabel
                key={`option_${rid()}`}
                value={value}
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
                    <Typography variant="body1" sx={{ color: 'hintText.main' }}>
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
