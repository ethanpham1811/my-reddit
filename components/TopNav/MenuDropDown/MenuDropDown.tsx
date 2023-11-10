import { RdDropdown } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import RdStaticInput from '@/components/utilities/RdInput/RdStaticInput'
import { TMenuItem } from '@/constants/types'
import { List, MenuItem } from '@/mui'
import { useRouter } from 'next/router'
import { KeyboardEvent, ReactNode, useRef, useState } from 'react'
import { renderSelectedOption } from './RenderedCbs'
import FeedsMenuList from './components/FeedsMenuList'
import PeopleMenuList from './components/PeopleMenuList'
import SubsMenuList from './components/SubsMenuList'
import useMenuData from './hooks/useMenuData'

type TMenuDropdownProps = {
  subName: string | string[] | undefined
  userPageName: string | string[] | undefined
  pathName: string
}
function MenuDropDown({ subName, userPageName, pathName }: TMenuDropdownProps) {
  const { pathname } = useRouter()
  const { session } = useAppSession()
  const { push: navigate } = useRouter()
  const menuRef = useRef<HTMLLIElement | null>(null)
  const me = session?.userDetail
  const [filterTerm, setFilterTerm] = useState('')
  const isUserOrSubPage: boolean = !!userPageName || !!subName
  const activePage: string = pathName === '/' ? 'Home' : (userPageName as string) ?? (subName as string)
  const [feedsOptions, communityOptions, followingOptions, activeOptions] = useMenuData(me, isUserOrSubPage, activePage)

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterTerm(e.target.value)
  }
  function filterByTerm(option: TMenuItem): boolean {
    return option.name.toLowerCase().includes(filterTerm.toLowerCase())
  }
  function handleRenderSelectedOption(_: string): ReactNode {
    return renderSelectedOption([...feedsOptions, ...communityOptions, ...followingOptions, ...activeOptions], activePage, subName, pathname)
  }

  /* handle tab when being focused in filtering input  */
  function handleTab(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Tab' || e.key === 'ArrowDown') {
      e.stopPropagation()
      e.preventDefault()
      menuRef && menuRef?.current && menuRef?.current?.focus()
    }
  }

  /* handle Enter on focused menu */
  function onEnter(e: KeyboardEvent<HTMLLIElement>, url: string): void {
    if (e.key === 'Enter') {
      navigate(url)
    }
  }

  return (
    <RdDropdown
      renderSelectedOption={handleRenderSelectedOption}
      value={me ? activePage || '' : 'Home'}
      flex={1}
      autoFocus
      offsetTop="10px"
      width="20vw"
      maxWidth="200px"
      minWidth="50px"
    >
      {/* Filter input */}
      <List sx={{ p: 2, pt: 1 }}>
        <RdStaticInput
          autoFocus
          onKeyDown={(e) => handleTab(e)}
          onClick={(e) => e.stopPropagation()}
          borderColor="black"
          onChange={handleFilter}
          placeholder="Filter"
        />
      </List>

      {/* Feeds list */}
      <FeedsMenuList ref={menuRef} onEnter={onEnter} value="Home" feedsOptions={feedsOptions} />

      {/* Subreddit list */}
      <SubsMenuList onEnter={onEnter} value="Home" options={communityOptions} filterByTerm={filterByTerm} />

      {/* Following list */}
      <PeopleMenuList onEnter={onEnter} value="active" options={followingOptions} filterByTerm={filterByTerm} />

      {/* Hidden option - A little hack for displaying unlisted Item (for profile pages) */}
      {isUserOrSubPage && <MenuItem sx={{ minHeight: 'auto', p: 0 }} disabled value={activePage}></MenuItem>}
    </RdDropdown>
  )
}

export default MenuDropDown
