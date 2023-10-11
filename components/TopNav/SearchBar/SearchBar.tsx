import { RdAutoComplete } from '@/components'
import { TAutocompleteOptions } from '@/constants/types'
import useTopSearchQueriedList from '@/hooks/useTopSearchQueriedList'
import { generateAutoCompleteUrl, isNotFound } from '@/services'
import { AutocompleteRenderInputParams, Box } from '@mui/material'
import { Session } from 'next-auth'
import { NextRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { renderGroup, renderOption } from './renderedCbs'
import SearchBarInput from './renderedCbs/SearchBarInput'

type TSearchBarProps = {
  session: Session | null
  subOrUserName: string | string[] | undefined
  pathName: string
  navigate: NextRouter['push']
}

function SearchBar({ session, subOrUserName, pathName, navigate }: TSearchBarProps) {
  const { queriedDataList, loading, error, searchTerm, setSearchTerm } = useTopSearchQueriedList()
  const [chip, setChip] = useState(true)

  /* Autocomplete props */

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput params={params} chip={chip} name={subOrUserName} onDeleteChip={onDeleteChip} />
  )
  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => setSearchTerm(value)

  const onChange = (_: SyntheticEvent<Element, Event>, option: string | TAutocompleteOptions | null) => {
    if (!option) return
    if (typeof option === 'string') navigate(`/search?q=${option}`) /* navigate to search page */
    else {
      /* navigate to corresponding page */
      const url = !isNotFound(option) ? generateAutoCompleteUrl(option) : null
      url && navigate(url)
    }
  }
  const onDeleteChip = () => setChip(false)
  const onBlur = () => setChip(true)

  return (
    <Box flex={1}>
      <RdAutoComplete<TAutocompleteOptions, false, false, true, 'span'>
        options={queriedDataList}
        disablePortal
        freeSolo
        selectOnFocus
        openOnFocus
        handleHomeEndKeys
        includeInputInList
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
