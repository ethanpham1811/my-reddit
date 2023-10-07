import { RdAutoComplete } from '@/components'
import { generateAutoCompleteUrl, isNotFound } from '@/components/utilities'
import { TAutocompleteOptions } from '@/constants/types'
import useTopSearchQueriedList from '@/hooks/useTopSearchQueriedList'
import { AutocompleteRenderInputParams, Box } from '@mui/material'
import { Session } from 'next-auth'
import { NextRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { renderGroup, renderOption } from './renderedComponents'
import SearchBarInput from './renderedComponents/SearchBarInput'

type TSearchBarProps = {
  session: Session | null
  subOrUserId: string | string[] | undefined
  pathName: string
  navigate: NextRouter['push']
}

function SearchBar({ session, subOrUserId, pathName, navigate }: TSearchBarProps) {
  // const { topTrendingData, loading, error, searchTerm, setSearchTerm } = useTopSearchListDefault()
  const { queriedDataList, loading, error, searchTerm, setSearchTerm } = useTopSearchQueriedList()
  const [chip, setChip] = useState(true)
  const [isFocused, setIsFocused] = useState(false)

  /* Autocomplete props */

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput params={params} chip={chip} name={subOrUserId} onDeleteChip={onDeleteChip} />
  )

  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => setSearchTerm(value)

  const onChange = (_: SyntheticEvent<Element, Event>, option: string | TAutocompleteOptions | null) => {
    if (!option) return
    if (typeof option === 'string') {
      /* navigate to search page */
      navigate(`/search?q=${option}`)
    } else {
      /* navigate to corresponding page */
      const url = !isNotFound(option) ? generateAutoCompleteUrl(option) : null
      url && navigate(url)
    }
  }
  const onDeleteChip = () => setChip(false)
  const onBlur = () => {
    // setIsFocused(false)
    setChip(true)
  }

  return (
    <Box flex={1}>
      <RdAutoComplete<TAutocompleteOptions, false, false, true, 'span'>
        options={queriedDataList}
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
        filterOptions={() => queriedDataList} // filtering disabled
        id="top-search-auto"
        flex={1}
      />
    </Box>
  )
}

export default SearchBar
