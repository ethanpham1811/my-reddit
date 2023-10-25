import { RdDropdown } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import RdStaticInput from '@/components/utilities/RdInput/RdStaticInput'
import { TMenuDropdownProps, TMenuItem } from '@/constants/types'
import { Divider, List, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { renderSelectedOption } from './RenderedCbs'
import FeedsMenuList from './components/FeedsMenuList'
import PeopleMenuList from './components/PeopleMenuList'
import SubsMenuList from './components/SubsMenuList'
import useMenuData from './hooks/useMenuData'

function MenuDropDown({ subName, mobileMode = false, userPageName, pathName }: TMenuDropdownProps) {
  const { pathname } = useRouter()
  const { session, loading } = useAppSession()
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
    return renderSelectedOption(
      value,
      mobileMode,
      [...feedsOptions, ...communityOptions, ...followingOptions, ...activeOptions],
      activePage,
      subName,
      pathname
    )
  }

  return (
    <RdDropdown
      renderSelectedOption={handleRenderSelectedOption}
      value={me ? activePage || '' : 'home'}
      flex={1}
      width="20vw"
      maxWidth="250px"
      minWidth="50px"
    >
      {/* Filter input */}
      <List sx={{ p: 2, pt: 1 }}>
        <RdStaticInput borderColor="black" autoFocus onChange={handleFilter} placeholder="Filter" />
      </List>

      {/* Feeds list */}
      <FeedsMenuList value="home" feedsOptions={feedsOptions} filterByTerm={filterByTerm} />

      <Divider sx={{ my: 1 }} />
      {/* Subreddit list */}
      <SubsMenuList value="home" loading={!me} options={communityOptions} filterByTerm={filterByTerm} />

      <Divider sx={{ my: 1 }} />
      {/* Following list */}
      <PeopleMenuList value="active" loading={!me} options={followingOptions} filterByTerm={filterByTerm} />

      {/* Hidden option - A little hack for displaying unlisted Item (for profile pages) */}
      {isUserOrSubPage && <MenuItem sx={{ p: 0 }} disabled value={activePage}></MenuItem>}
    </RdDropdown>
  )
}

export default MenuDropDown
