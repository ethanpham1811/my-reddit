import { RdAutoComplete } from '@/components'
import { TAutocompleteOptions } from '@/constants/types'
import useTopSearchQueriedList from '@/hooks/useTopSearchQueriedList'
import { generateAutoCompleteUrl, isNotFound } from '@/services'
import { AutocompleteRenderInputParams, Box } from '@mui/material'
import { NextRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { renderGroup, renderOption } from './components'
import SearchBarInput from './components/SearchBarInput'

type TSearchBarProps = {
  subOrUserName: string | string[] | undefined
  pathName: string
  navigate: NextRouter['push']
}

function SearchBar({ subOrUserName, pathName, navigate }: TSearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [chip, setChip] = useState(true)
  const { queriedDataList = [], loading, error, searchTerm, setSearchTerm } = useTopSearchQueriedList(focused)

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput params={params} chip={chip} name={subOrUserName} onDeleteChip={onDeleteChip} />
  )

  /* Autocomplete listeners */
  const onChange = (_: SyntheticEvent<Element, Event>, option: string | TAutocompleteOptions | null) => {
    if (!option) return

    if (typeof option === 'string') {
      /* navigate to search page upon enter (enter emits a string)  */
      navigate(`/search?q=${option}`)
    } else {
      /* navigate to corresponding page upon selecting from dropdown (selecting emits the selected object) */
      const url = !isNotFound(option) ? generateAutoCompleteUrl(option) : null
      url && navigate(url)
    }
  }
  const onInputChange = (_: SyntheticEvent<Element, Event>, value: string) => setSearchTerm(value)
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
        onFocus={() => {
          setFocused(true)
        }}
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
