import { RdAutoComplete } from '@/components'
import { TSubreddit } from '@/constants/types'
import useTopSearchList from '@/hooks/useTopSearchList'
import { AutocompleteRenderInputParams, Box, ListItem, TextField, Typography, styled } from '@mui/material'
import { Session } from 'next-auth'
import Link from 'next/link'
import { HTMLAttributes, ReactNode, SyntheticEvent, useState } from 'react'
import Input from './Input'

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

type TSearchBarProps = {
  session: Session | null
  subName: string | string[] | undefined
  pathName: string
}

function SearchBar({ session, subName, pathName }: TSearchBarProps) {
  const { queryList, loading, error, searchTerm, setSearchTerm } = useTopSearchList()
  const [chip, setChip] = useState(true)
  const [selectedOption, setSelectedOption] = useState<TSubreddit | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const getOptionLabel = (option: TSubreddit | string) => (typeof option === 'string' ? option : option.name)

  /* Autocomplete props */
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: TSubreddit): ReactNode => (
    <Link href={`/r/${option.name}`}>
      <ListItem sx={{ '&:hover': { bgcolor: 'inputBgOutfocused.main' } }}>
        <Typography>{option.name}</Typography>
      </ListItem>
    </Link>
  )

  const renderInput = (params: AutocompleteRenderInputParams) => <Input params={params} chip={chip} subName={subName} onDeleteChip={onDeleteChip} />
  const handleSearch = (event: SyntheticEvent<Element, Event>, value: string) => {
    setSearchTerm(value)
  }

  const onDeleteChip = () => {
    setChip(false)
  }
  const onAddChip = () => {
    setIsFocused(false)
    setChip(true)
  }

  return (
    <Box flex={1}>
      <RdAutoComplete<TSubreddit, false, false, true, 'span'>
        options={queryList}
        selectOnFocus
        disablePortal
        // freeSolo
        openOnFocus
        handleHomeEndKeys
        loading={loading}
        // open={searchTerm !== '' && isFocused}
        popupIcon={false}
        onBlur={onAddChip}
        onFocus={() => setIsFocused(true)}
        onInputChange={handleSearch}
        onChange={(e, val) => console.log(val)}
        renderInput={renderInput}
        renderOption={renderOption}
        // value={selectedOption}
        // isOptionEqualToValue={(option, value) => {
        //   console.log(option, value)
        //   return option.name === value.name
        // }}
        // getOptionLabel={getOptionLabel}
        // noOptionsText={<div>Nothing found</div>}
        id="top-search-auto"
        flex={1}
      />
    </Box>
  )
}

export default SearchBar
