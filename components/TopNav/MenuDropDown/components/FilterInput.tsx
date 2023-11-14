import RdStaticInput from '@/components/utilities/RdInput/RdStaticInput'
import { Box } from '@/mui'
import { Dispatch, KeyboardEvent, SetStateAction } from 'react'

type TFilterInputProps = {
  value: string
  filterTerm: string
  menuRef: React.RefObject<HTMLLIElement>
  focusFilterInput: () => void
  filterInputRef: React.RefObject<HTMLInputElement>
  setFilterTerm: Dispatch<SetStateAction<string>>
}

function FilterInput({ menuRef, filterInputRef, focusFilterInput, setFilterTerm, filterTerm, ...rest }: TFilterInputProps) {
  /* handle tab when being focused in filtering input  */
  function handleTab(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Tab' || e.key === 'ArrowDown') {
      e.stopPropagation()
      e.preventDefault()
      menuRef && menuRef?.current && menuRef?.current?.focus()
    }
  }

  /* set filter term */
  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterTerm(e.target.value)
  }

  return (
    <Box sx={{ p: 2, pt: 1, outline: 'none' }} onFocus={focusFilterInput} {...rest}>
      <RdStaticInput
        value={filterTerm}
        ref={filterInputRef}
        onKeyDown={handleTab}
        onClick={(e) => e.stopPropagation()}
        borderColor="black"
        onChange={handleFilter}
        placeholder="Filter"
      />
    </Box>
  )
}

export default FilterInput
