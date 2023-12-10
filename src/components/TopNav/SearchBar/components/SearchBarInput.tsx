import { RdChip } from '@/src/components'
import { HighlightOffOutlinedIcon, SearchIcon } from '@/src/constants/icons'
import { Avatar, CircularProgress, Stack, TextField } from '@/src/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/services/utils'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

type TInputProps = {
  params: AutocompleteRenderInputParams
  chip: boolean
  name: string | string[] | undefined
  onDeleteChip: () => void
  isMobile: boolean
  focused: boolean
  loading: boolean
  setFocused: Dispatch<SetStateAction<boolean>>
}

/* Autocomplete input display */
function SearchBarInput({ params, loading, setFocused, chip, focused, isMobile, name, onDeleteChip }: TInputProps) {
  const ref = useRef<HTMLInputElement | null>(null)
  // delete the controlled value of Autocomplete
  // => prevent input value to changed upon selecting options
  delete params.inputProps.value

  useEffect(() => {
    if (ref && ref?.current) {
      focused ? ref?.current?.focus() : ref?.current?.blur()
    }
  }, [focused])

  const startAdornment = () => (
    <Stack direction="row" alignItems="center" className="search-icon">
      {loading ? (
        <CircularProgress sx={{ mr: 0.5, ml: 1, color: 'black.main' }} size={21} />
      ) : (
        <SearchIcon onClick={() => setFocused(true)} sx={{ mr: '0.25rem !important', cursor: 'pointer' }} />
      )}

      {chip && name && !isMobile && (
        <RdChip
          avatar={
            <Avatar
              variant="circular"
              sx={{
                width: '20px !important',
                height: '20px !important',
                backgroundColor: generateSeededHexColor(name as string),
                border: (theme): string => `1px solid ${theme.palette.primary.dark}`
              }}
              alt="subreddit avatar"
              src={generateUserImage(name as string)}
            />
          }
          onDelete={onDeleteChip}
          deleteIcon={<HighlightOffOutlinedIcon sx={{ opacity: 0.6, color: '#1A1A1B !important' }} />}
          label={`r/${name}`}
          sx={{ mx: 1, height: 28 }}
        />
      )}
    </Stack>
  )

  return (
    <TextField
      inputRef={ref}
      {...params}
      InputProps={{
        ...params.InputProps,
        startAdornment: startAdornment(),
        placeholder: isMobile ? 'Search' : 'Search Reddit'
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
          bgcolor: 'primary.light',
          '.MuiStack-root > .MuiSvgIcon-root': {
            mx: 1
          },
          '&.Mui-focused, &:hover': {
            bgcolor: 'white.main'
          }
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
