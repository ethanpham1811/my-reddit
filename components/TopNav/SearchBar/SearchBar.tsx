import { Box, TextField, styled } from '@mui/material'
import { useEffect, useState } from 'react'

import { RdAutoComplete } from '@/components'
import { TSearchTerm } from '@/constants/types'
import SearchIcon from '@mui/icons-material/Search'
import { useForm } from 'react-hook-form'

const SearchField = styled(TextField)(({ theme }) => {
  return {
    '.MuiInputBase-root': {
      borderRadius: '1.5rem',
      width: '100%',
      backgroundColor: theme.palette.inputBgOutfocused.main,
      '.MuiSvgIcon-root': {
        margin: `0 ${theme.spacing(1)}`
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
  const [loading, setLoading] = useState(true)
  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<TSearchTerm>()

  /* mockup data */
  const options: object[] = loading
    ? []
    : [{ topic: 'Artificial Intelligent Arts' }, { topic: 'Programming languages' }, { topic: 'Social and family issues' }]

  useEffect(() => {
    if (!loading) return
    const to = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(to)
  }, [loading])

  return (
    <Box flex={1}>
      <RdAutoComplete
        control={control}
        name="term"
        options={options}
        loading={loading}
        startAdornment={<SearchIcon />}
        placeholder="Search Reddit"
        id="top-search-auto"
        flex={1}
      />
    </Box>
  )
}

export default SearchBar
