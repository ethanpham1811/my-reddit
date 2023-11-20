import { RdAutoComplete } from '@/src/components'
import { TAutocompleteOptions } from '@/src/constants/types'
import { useTopSearchQueriedList } from '@/src/hooks'
import { Box } from '@/src/mui'
import { isNotFound } from '@/src/services/typeCheck'
import { generateAutoCompleteUrl } from '@/src/services/utils'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import { NextRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { renderContainer, renderGroup, renderOption } from './components/RenderedCbs'
import SearchBarInput from './components/SearchBarInput'

type TSearchBarProps = {
  subOrUserName: string | string[] | undefined
  navigate: NextRouter['push']
  isMobile: boolean
}

function SearchBar({ subOrUserName, isMobile, navigate }: TSearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [chip, setChip] = useState(true)
  const { dataList = [], loading, searchTerm, setSearchTerm } = useTopSearchQueriedList(focused)

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <SearchBarInput
      setFocused={setFocused}
      focused={focused}
      params={params}
      chip={chip}
      isMobile={isMobile}
      name={subOrUserName}
      onDeleteChip={onDeleteChip}
    />
  )

  /* Autocomplete listeners */
  const onChange = (_: SyntheticEvent<Element, Event>, option: string | TAutocompleteOptions | null) => {
    setFocused(false)
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
  const onDeleteChip = () => setChip(false)
  const onInputChange = (e: SyntheticEvent<Element, Event>, value: string) => {
    e?.type === 'change' && setSearchTerm(value)
  }
  const onBlur = () => {
    setFocused(false)
    setChip(true)
  }

  return (
    <RdAutoComplete<TAutocompleteOptions, false, true, true, 'span'>
      options={dataList}
      disablePortal
      freeSolo
      selectOnFocus
      openOnFocus
      handleHomeEndKeys
      includeInputInList
      loading={loading}
      inputValue={searchTerm}
      popupIcon={false}
      isMobile={isMobile}
      focused={focused}
      disableClearable={true}
      groupBy={(option): string => option.groupBy}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
      onInputChange={onInputChange}
      onChange={onChange}
      renderInput={renderInput}
      renderGroup={renderGroup}
      renderOption={renderOption}
      PaperComponent={(props) => renderContainer(props, searchTerm)}
      noOptionsText={<Box>Nothing found</Box>}
      getOptionLabel={() => ''} // prevent displaying selected option value
      filterOptions={() => dataList} // filtering disabled
      id="top-search-auto"
      sx={{ flex: { xs: 1, xl: 0.8 }, mx: 'auto' }}
    />
  )
}

export default SearchBar
