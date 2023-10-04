import { Box, TextField, styled } from '@mui/material'

import { RdAutoComplete } from '@/components'
import { TSearchTerm, TSubreddit } from '@/constants/types'
import useTop3PostsNSubreddit from '@/hooks/useTop3PostsNSubreddit'
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
  const { queryList, loading, error } = useTop3PostsNSubreddit()
  // const [loading, setLoading] = useState(false)
  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<TSearchTerm>()

  /* mockup data */
  const options: TSubreddit[] = loading
    ? []
    : [
        { name: 'Artificial Intelligent Arts', id: 12 },
        { name: 'Programming languages', id: 12 },
        { name: 'Social and family issues', id: 12 }
      ]

  // useEffect(() => {
  //   if (!loading) return
  //   const to = setTimeout(() => setLoading(false), 2000)
  //   return () => clearTimeout(to)
  // }, [loading])

  const onSubmit = handleSubmit(async (formData) => {
    // form submit logic
    reset()
  })

  return (
    <Box flex={1}>
      <form onSubmit={onSubmit}>
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
      </form>
    </Box>
  )
}

export default SearchBar
