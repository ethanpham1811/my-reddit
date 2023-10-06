import { RdAutoComplete } from '@/components'
import { isTopTrending } from '@/components/utilities'
import { TPopularSub, TTopTrending } from '@/constants/types'
import useTopSearchList from '@/hooks/useTopSearchList'
import { AutocompleteRenderInputParams, Box, ListItem, Typography } from '@mui/material'
import { Session } from 'next-auth'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { HTMLAttributes, ReactNode, SyntheticEvent, useState } from 'react'
import SearchBarInput from './Input'

type TSearchBarProps = {
  session: Session | null
  subName: string | string[] | undefined
  pathName: string
  navigate: NextRouter['push']
}

function SearchBar({ session, subName, pathName, navigate }: TSearchBarProps) {
  const { topTrendingData, loading, error, searchTerm, setSearchTerm } = useTopSearchList()
  console.log(topTrendingData)
  const [chip, setChip] = useState(true)
  // const [selectedOption, setSelectedOption] = useState<TSubreddit | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const getOptionLabel = (option: TTopTrending | TPopularSub | string): string => {
    return typeof option === 'string' ? option : isTopTrending(option) ? option.title : option.name
  }

  /* Autocomplete props */
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: TTopTrending | TPopularSub): ReactNode => {
    const label = isTopTrending(option) ? option.title : option.name
    const url = isTopTrending(option) ? `/p/${option.id}` : `/r/${option.name}`

    return (
      // use Link only for prefetch functionality, disable navigation on click
      <Link href={url} onClick={(e) => e.preventDefault()}>
        <ListItem {...props} sx={{ '&:hover': { bgcolor: 'inputBgOutfocused.main' } }}>
          <Typography>{label}</Typography>
        </ListItem>
      </Link>
    )
  }
  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput params={params} chip={chip} subName={subName} onDeleteChip={onDeleteChip} />
  )
  const handleSearch = (_: SyntheticEvent<Element, Event>, value: string) => setSearchTerm(value)

  const onChange = (_: SyntheticEvent<Element, Event>, option: string | TTopTrending | TPopularSub | null) => {
    const url = !option || typeof option === 'string' ? null : isTopTrending(option) ? `/p/${option.id}` : `/r/${option.name}`
    url && navigate(url)
  }
  const onDeleteChip = () => setChip(false)
  const onAddChip = () => {
    setIsFocused(false)
    setChip(true)
  }

  return (
    <Box flex={1}>
      <RdAutoComplete<TTopTrending | TPopularSub, false, false, true, 'span'>
        options={topTrendingData}
        selectOnFocus
        disablePortal
        freeSolo
        openOnFocus
        handleHomeEndKeys
        loading={loading}
        open={searchTerm !== '' && isFocused}
        popupIcon={false}
        onBlur={onAddChip}
        onFocus={() => setIsFocused(true)}
        onInputChange={handleSearch}
        onChange={onChange}
        renderInput={renderInput}
        renderOption={renderOption}
        // value={selectedOption}
        // isOptionEqualToValue={(option, value) => {
        //   console.log(option, value)
        //   return option.name === value.name
        // }}
        getOptionLabel={getOptionLabel}
        noOptionsText={<div>Nothing found</div>}
        id="top-search-auto"
        flex={1}
      />
    </Box>
  )
}

export default SearchBar
