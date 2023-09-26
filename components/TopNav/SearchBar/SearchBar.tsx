import { Autocomplete, Box, CircularProgress, TextField, styled } from '@mui/material'
import { useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { useTheme } from '@mui/material/styles'

const SearchField = styled(TextField)(({ theme }) => {
  return {
    '.MuiInputBase-root': {
      borderRadius: '1.5rem',
      width: '100%',
      border: `1px solid ${theme.palette.inputBorder.main}`,
      backgroundColor: theme.palette.inputBgOutfocused.main,
      '.MuiSvgIcon-root': {
        margin: '0 0.5rem'
      },
      '&.Mui-focused': {
        backgroundColor: 'white'
      }
    },
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    'input.MuiAutocomplete-input': {
      padding: '0 !important'
    },
    '[aria-expanded=true]': {
      '~ .MuiOutlinedInput-notchedOutline': { borderBottom: 'none' }
    }
  }
})

function SearchBar() {
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const options = loading ? [] : [{ title: 'Artificial Intelligent Arts' }, { title: 'Programming languages' }, { title: 'Social and family issues' }]

  useEffect(() => {
    if (!loading) return
    const to = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(to)
  }, [loading])

  return (
    <Box flex={2}>
      <Autocomplete
        id="search-bar"
        sx={{
          minWidth: 200,
          '&.Mui-expanded': {
            '.MuiInputBase-root': {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            }
          }
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        // open={open}
        onOpen={() => setLoading(true)}
        onClose={() => setLoading(false)}
        renderInput={(params) => (
          <SearchField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon />,
              endAdornment: <>{loading ? <CircularProgress color="inherit" size={20} /> : null}</>,
              placeholder: 'Search Reddit'
            }}
          />
        )}
      />
    </Box>
  )
}

export default SearchBar
