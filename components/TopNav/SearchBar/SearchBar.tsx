import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25)
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto'
//   }
// }))

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: '2rem',
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// }))

function SearchBar() {
  const [loading, setLoading] = useState(false)

  const options = [{ title: 'Artificial Intelligent Arts' }, { title: 'Programming languages' }, { title: 'Social and family issues' }]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  return (
    <section>
      <Autocomplete
        id="search-bar"
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <div>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          </div>
        )}
      />
    </section>
  )
}

export default SearchBar
