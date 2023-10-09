import { AutocompleteRenderInputParams, Avatar, Stack, TextField } from '@mui/material'

import { RdChip } from '@/components'
import { HighlightOffOutlinedIcon } from '@/constants/icons'
import { generateSeededHexColor, generateUserImage } from '@/services'
import SearchIcon from '@mui/icons-material/Search'

type TInputProps = {
  params: AutocompleteRenderInputParams
  chip: boolean
  name: string | string[] | undefined
  onDeleteChip: () => void
}

/* Autocomplete input display */
function SearchBarInput({ params, chip, name, onDeleteChip }: TInputProps) {
  const startAdornment = () => (
    <Stack direction="row" alignItems="center">
      <SearchIcon />
      {chip && name && (
        <RdChip
          avatar={
            <Avatar
              variant="circular"
              sx={{
                width: '20px !important',
                height: '20px !important',
                backgroundColor: generateSeededHexColor(name as string),
                border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
              }}
              src={generateUserImage(name as string)}
            />
          }
          onDelete={onDeleteChip}
          deleteIcon={<HighlightOffOutlinedIcon sx={{ opacity: 0.6, color: '#1A1A1B !important' }} />}
          label={`r/${name}`}
          sx={{ bgcolor: 'inputBorder.main', mr: 1, height: 28 }}
        />
      )}
    </Stack>
  )

  return (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        startAdornment: startAdornment(),
        // endAdornment:  <>{!loading ? <CircularProgress color="inherit" size={20} /> : null}</>,
        placeholder: 'Search Reddit'
      }}
      sx={{
        '.MuiInputBase-root': {
          flexWrap: 'nowrap',
          borderRadius: '1.5rem',
          width: '100%',
          height: '40px',
          pr: '1rem !important',
          p: '0.2rem !important',
          pl: 3,
          bgcolor: 'inputBgOutfocused.main',
          '.MuiStack-root > .MuiSvgIcon-root': {
            mx: 1
          },
          '&.Mui-focused, &:hover': {
            bgcolor: 'white.main'
          }
        },
        'input.MuiAutocomplete-input': {
          p: '0 !important'
        },
        '[aria-expanded=true]': {
          '~ fieldset': { borderBottom: 'none' }
        }
      }}
    />
  )
}

export default SearchBarInput
