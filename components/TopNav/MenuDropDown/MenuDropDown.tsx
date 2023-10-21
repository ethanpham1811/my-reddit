import { RdDropdown } from '@/components'
import { useAppSession } from '@/components/Layouts/MainLayout'
import RdStaticInput from '@/components/utilities/RdInput/RdStaticInput'
import { MAIN_MENU_GROUP } from '@/constants/enums'
import { HomeIcon } from '@/constants/icons'
import { TMenuDropdownProps, TMenuItem } from '@/constants/types'
import { Divider, List } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { renderSelectedOption } from './RenderedCbs'
import FeedsMenuList from './components/FeedsMenuList'
import PeopleMenuList from './components/PeopleMenuList'
import SubsMenuList from './components/SubsMenuList'

function MenuDropDown({ subName, userPageName, pathName }: TMenuDropdownProps) {
  const { pathname } = useRouter()
  const [filterTerm, setFilterTerm] = useState('')
  const { session, loading } = useAppSession()
  const me = session?.userDetail
  const joinedSubListNames: string[] | undefined = me?.member_of_ids
  const activePage: string = pathName === '/' ? 'Home' : (userPageName as string) ?? (subName as string)

  /* Mock data--------------------------------- */
  const feedsOptions: TMenuItem[] = [
    {
      name: 'Home',
      icon: HomeIcon,
      group: MAIN_MENU_GROUP.Feeds
    }
  ]
  const communityOptions: TMenuItem[] = joinedSubListNames
    ? joinedSubListNames.map((name: string): TMenuItem => ({ name, group: MAIN_MENU_GROUP.Communities }))
    : []
  const peopleOptions: TMenuItem[] =
    userPageName || subName
      ? [
          {
            name: activePage,
            group: MAIN_MENU_GROUP.CurrentPage
          }
        ]
      : []
  /* End Mock data----------------------- */

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterTerm(e.target.value)
  }
  function filterByTerm(option: TMenuItem): boolean {
    return option.name.toLowerCase().includes(filterTerm.toLowerCase())
  }
  function handleRenderSelectedOption(value: string): ReactNode {
    return renderSelectedOption(value, true, [...feedsOptions, ...communityOptions, ...peopleOptions], activePage, subName, pathname)
  }

  return (
    <RdDropdown
      renderSelectedOption={handleRenderSelectedOption}
      value={me ? activePage || '' : 'home'}
      flex={1}
      width="20vw"
      maxWidth="250px"
      minWidth="50px"
      mobileMode
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
      {/* Hidden user list - A little hack for displaying unlisted Item (for profile pages) */}
      <PeopleMenuList value="active" loading={!me} options={peopleOptions} filterByTerm={filterByTerm} />
    </RdDropdown>
  )
}

export default MenuDropDown
