import { RdDropdown } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import { TMenuItem } from '@/constants/types'
import { MenuItem } from '@/mui'
import { useRouter } from 'next/router'
import { KeyboardEvent, ReactNode, useRef, useState } from 'react'
import { renderSelectedOption } from './RenderedCbs'
import FeedsMenuList from './components/FeedsMenuList'
import FilterInput from './components/FilterInput'
import PeopleMenuList from './components/PeopleMenuList'
import SubsMenuList from './components/SubsMenuList'
import useMenuData from './hooks/useMenuData'

type TMenuDropdownProps = {
  subName: string | string[] | undefined
  userPageName: string | string[] | undefined
  pathName: string
}
function MenuDropDown({ subName, userPageName, pathName }: TMenuDropdownProps) {
  const { pathname, push: navigate } = useRouter()
  const { session } = useAppSession()
  const me = session?.userDetail
  const menuRef = useRef<HTMLLIElement | null>(null)
  const filterInputRef = useRef<HTMLInputElement | null>(null)

  const [filterTerm, setFilterTerm] = useState('')
  const isUserOrSubPage: boolean = !!userPageName || !!subName
  const activePage: string = pathName === '/' ? 'Home' : (userPageName as string) ?? (subName as string)
  const [feedsOptions, communityOptions, followingOptions, activeOptions] = useMenuData(me, isUserOrSubPage, activePage)

  function filterByTerm(option: TMenuItem): boolean {
    return option.name.toLowerCase().includes(filterTerm.toLowerCase())
  }
  function handleRenderSelectedOption(_: string): ReactNode {
    return renderSelectedOption([...feedsOptions, ...communityOptions, ...followingOptions, ...activeOptions], activePage, subName, pathname)
  }

  /* focus filter input on open */
  function focusFilterInput(): void {
    setTimeout(() => {
      filterInputRef && filterInputRef?.current && filterInputRef?.current?.focus()
    }, 100)
  }

  /* handle Enter on focused menu */
  function onEnter(e: KeyboardEvent<HTMLLIElement>, url: string): void {
    e.key === 'Enter' && navigate(url)
  }

  // value="dummy" => value has to be set in order for Mui Select to work (even though we don't use it)
  return (
    <RdDropdown
      onOpen={focusFilterInput}
      value=""
      renderSelectedOption={handleRenderSelectedOption}
      flex={1}
      offsetTop="10px"
      width="20vw"
      maxWidth="200px"
      minWidth="50px"
    >
      {/* Filter input */}
      <FilterInput
        setFilterTerm={setFilterTerm}
        filterTerm={filterTerm}
        menuRef={menuRef}
        filterInputRef={filterInputRef}
        focusFilterInput={focusFilterInput}
      />

      {/* Feeds list */}
      <FeedsMenuList onEnter={onEnter} options={feedsOptions} ref={menuRef} />

      {/* Subreddit list */}
      <SubsMenuList onEnter={onEnter} options={communityOptions.filter(filterByTerm)} />

      {/* Following list */}
      <PeopleMenuList onEnter={onEnter} options={followingOptions.filter(filterByTerm)} />

      {/* Hidden option - A little hack for displaying unlisted Item (for profile pages) */}
      {isUserOrSubPage && <MenuItem sx={{ minHeight: 'auto', p: 0 }} disabled value={activePage}></MenuItem>}
    </RdDropdown>
  )
}

export default MenuDropDown
