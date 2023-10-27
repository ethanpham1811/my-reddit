import { RdAutoComplete } from '@/components'
import { TAutocompleteOptions } from '@/constants/types'
import useTopSearchQueriedList from '@/hooks/useTopSearchQueriedList'
import { generateAutoCompleteUrl, isNotFound } from '@/services'
import { AutocompleteRenderInputParams } from '@mui/material'
import { NextRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { renderGroup, renderOption } from './components'
import SearchBarInput from './components/SearchBarInput'

type TSearchBarProps = {
  subOrUserName: string | string[] | undefined
  navigate: NextRouter['push']
  lgMobile: boolean
}

function SearchBar({ subOrUserName, lgMobile, navigate }: TSearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [chip, setChip] = useState(true)
  const { queriedDataList = [], loading, searchTerm, setSearchTerm } = useTopSearchQueriedList(focused)

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput
      setFocused={setFocused}
      focused={focused}
      params={params}
      chip={chip}
      isMobile={lgMobile}
      name={subOrUserName}
      onDeleteChip={onDeleteChip}
    />
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
  const onBlur = () => {
    setFocused(false)
    setChip(true)
  }

  return (
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
      isMobile={lgMobile}
      focused={focused}
      groupBy={(option): string => option.groupBy}
      // open={true}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
      onInputChange={onInputChange}
      onChange={onChange}
      renderInput={renderInput}
      renderGroup={renderGroup}
      renderOption={renderOption}
      noOptionsText={<div>Nothing found</div>}
      getOptionLabel={() => ''} // prevent displaying selected option value
      filterOptions={() => queriedDataList} // filtering disabled
      id="top-search-auto"
      sx={{ flex: { xs: 1, xl: 0.6 }, mx: 'auto' }}
    />
  )
}

export default SearchBar
