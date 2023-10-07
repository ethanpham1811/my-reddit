import { RdAutoComplete } from '@/components'
import { generateAutoCompleteUrl } from '@/components/utilities'
import { TAutocompleteOptions } from '@/constants/types'
import useTopSearchListByTerm from '@/hooks/useTopSearchListByTerm'
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
  // const { topTrendingData, loading, error, searchTerm, setSearchTerm } = useTopSearchListDefault()
  const { searchByTermData, loading, error, searchTerm, setSearchTerm } = useTopSearchListByTerm()
  const [chip, setChip] = useState(true)
  const [isFocused, setIsFocused] = useState(false)

  /* Autocomplete props */

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput params={params} chip={chip} subName={subName} onDeleteChip={onDeleteChip} />
  )

  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => setSearchTerm(value)

  const onChange = (_: SyntheticEvent<Element, Event>, option: string | TAutocompleteOptions | null) => {
    if (!option || typeof option === 'string') return
    /* navigate to corresponding page */
    const url = generateAutoCompleteUrl(option)
    url && navigate(url)
  }
  const onDeleteChip = () => setChip(false)
  const onBlur = () => {
    // setIsFocused(false)
    setChip(true)
  }

  return (
    <Box flex={1}>
      <RdAutoComplete<TAutocompleteOptions, false, false, true, 'span'>
        options={searchByTermData}
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
        filterOptions={() => searchByTermData} // filtering disabled
        id="top-search-auto"
        flex={1}
      />
    </Box>
  )
}

export default SearchBar
