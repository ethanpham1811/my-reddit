import { Autocomplete, Box, CircularProgress, TextField, styled } from '@mui/material'
import { useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { useTheme } from '@mui/material/styles'

const SearchIconWrapper = styled('div')(({ theme }) => {
  return {
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: {
      color: theme.palette.actionIcon.main
    }
  }
})

const SearchField = styled(TextField)(({ theme }) => {
  return {
    '&> div': { borderRadius: '2.5rem', width: '100%' },
    '&> div:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.hoverState.main
    },
    '.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.hoverState.main,
      borderWidth: '1px'
    },
    input: {
      paddingY: `0 !important`
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
        sx={{ minWidth: 200 }}
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
              startAdornment: (
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              ),
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              placeholder: 'Search Reddit'
            }}
          />
        )}
      />
    </Box>
  )
}

export default SearchBar
