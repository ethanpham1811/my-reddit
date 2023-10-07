import { RdAutoComplete } from '@/components'
import { isTopTrending } from '@/components/utilities'
import { TPopularSub, TTopTrending } from '@/constants/types'
import useTopSearchList from '@/hooks/useTopSearchList'
import { AutocompleteRenderInputParams, Box } from '@mui/material'
import { Session } from 'next-auth'
import { NextRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { renderGroup, renderOption } from './renderedComponents'
import SearchBarInput from './renderedComponents/SearchBarInput'

type TSearchBarProps = {
  session: Session | null
  subName: string | string[] | undefined
  pathName: string
  navigate: NextRouter['push']
}

function SearchBar({ session, subName, pathName, navigate }: TSearchBarProps) {
  const { topTrendingData, loading, error, searchTerm, setSearchTerm } = useTopSearchList()
  const [chip, setChip] = useState(true)
  const [isFocused, setIsFocused] = useState(false)

  /* Autocomplete props */

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput params={params} chip={chip} subName={subName} onDeleteChip={onDeleteChip} />
  )

  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => setSearchTerm(value)

  const onChange = (_: SyntheticEvent<Element, Event>, option: string | TTopTrending | TPopularSub | null) => {
    /* navigate to corresponding page */
    const url = !option || typeof option === 'string' ? null : isTopTrending(option) ? `/p/${option.id}` : `/r/${option.name}`
    url && navigate(url)
    setSearchTerm('')
  }
  const onDeleteChip = () => setChip(false)
  const onBlur = () => {
    // setIsFocused(false)
    setChip(true)
  }

  return (
    <Box flex={1}>
      <RdAutoComplete<TTopTrending | TPopularSub, false, false, true, 'span'>
        options={topTrendingData}
        disablePortal
        freeSolo
        selectOnFocus
        openOnFocus
        handleHomeEndKeys
        loading={loading}
        inputValue={searchTerm}
        popupIcon={false}
        groupBy={(option): string => option.groupBy}
        // open={true}
        // open={searchTerm !== '' && isFocused}
        onBlur={onBlur}
        onInputChange={onInputChange}
        onChange={onChange}
        // onFocus={() => setIsFocused(true)}
        renderInput={renderInput}
        renderGroup={renderGroup}
        renderOption={renderOption}
        // value={selectedOption}
        // isOptionEqualToValue={undefined}
        noOptionsText={<div>Nothing found</div>}
        getOptionLabel={() => ''} // prevent displaying selected option value
        filterOptions={() => topTrendingData} // filtering disabled
        id="top-search-auto"
        flex={1}
      />
    </Box>
  )
}

export default SearchBar
