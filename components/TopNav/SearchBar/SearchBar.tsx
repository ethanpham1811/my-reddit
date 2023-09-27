import { Autocomplete, Box, CircularProgress, TextField, styled } from '@mui/material'
import { useEffect, useState } from 'react'

import { borderColorStyle } from '@/mui/styles'
import SearchIcon from '@mui/icons-material/Search'

const SearchField = styled(TextField)(({ theme }) => {
  return {
    '.MuiInputBase-root': {
      borderRadius: '1.5rem',
      width: '100%',
      backgroundColor: theme.palette.inputBgOutfocused.main,
      '.MuiSvgIcon-root': {
        margin: '0 0.5rem'
      },
      '&.Mui-focused, &:hover': {
        backgroundColor: 'white'
      }
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
          },
          ...borderColorStyle
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
