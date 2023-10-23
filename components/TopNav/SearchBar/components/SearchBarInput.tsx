import { AutocompleteRenderInputParams, Avatar, Stack, TextField } from '@mui/material'

import { RdChip } from '@/components'
import { HighlightOffOutlinedIcon } from '@/constants/icons'
import { generateSeededHexColor, generateUserImage } from '@/services'
import SearchIcon from '@mui/icons-material/Search'
import { Dispatch, SetStateAction } from 'react'

type TInputProps = {
  params: AutocompleteRenderInputParams
  chip: boolean
  name: string | string[] | undefined
  onDeleteChip: () => void
  isMobile: boolean
  focused: boolean
  setFocused: Dispatch<SetStateAction<boolean>>
}

/* Autocomplete input display */
function SearchBarInput({ params, setFocused, chip, focused, isMobile, name, onDeleteChip }: TInputProps) {
  const startAdornment = () => (
    <Stack direction="row" alignItems="center" className="search-icon">
      <SearchIcon onClick={() => setFocused(true)} sx={{ cursor: 'pointer' }} />
      {chip && name && !isMobile && (
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
          sx={{ mr: 1, height: 28 }}
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
        '.MuiInputBase-root.MuiAutocomplete-inputRoot': {
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
          p: '0 !important',
          display: isMobile && !focused ? 'none' : 'block'
        },
        '.MuiAutocomplete-endAdornment': {
          display: isMobile && !focused ? 'none' : 'block'
        },
        '[aria-expanded=true]': {
          '~ fieldset': { borderBottom: 'none' }
        }
      }}
    />
  )
}

export default SearchBarInput
