import { RdDropdown } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import RdStaticInput from '@/components/utilities/RdInput/RdStaticInput'
import { TMenuItem } from '@/constants/types'
import { List, MenuItem } from '@/mui'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
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
  function handleRenderSelectedOption(value: string): ReactNode {
    return renderSelectedOption([...feedsOptions, ...communityOptions, ...followingOptions, ...activeOptions], activePage, subName, pathname)
  }

  return (
    <RdDropdown
      renderSelectedOption={handleRenderSelectedOption}
      value={me ? activePage || '' : 'home'}
      flex={1}
      width="20vw"
      maxWidth="200px"
      minWidth="50px"
    >
      {/* Filter input */}
      <List sx={{ p: 2, pt: 1 }}>
        <RdStaticInput borderColor="black" autoFocus onChange={handleFilter} placeholder="Filter" />
      </List>

      {/* Feeds list */}
      <FeedsMenuList value="home" feedsOptions={feedsOptions} filterByTerm={filterByTerm} />

      {/* Subreddit list */}
      <SubsMenuList value="home" options={communityOptions} filterByTerm={filterByTerm} />

      {/* Following list */}
      <PeopleMenuList value="active" options={followingOptions} filterByTerm={filterByTerm} />

      {/* Hidden option - A little hack for displaying unlisted Item (for profile pages) */}
      {isUserOrSubPage && <MenuItem sx={{ minHeight: 'auto', p: 0 }} disabled value={activePage}></MenuItem>}
    </RdDropdown>
  )
}

export default MenuDropDown
