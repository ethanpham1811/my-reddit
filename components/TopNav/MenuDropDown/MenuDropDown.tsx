import { RdDropdown } from '@/components'
import { AppContext } from '@/components/Layouts/MainLayout'
import RdStaticInput from '@/components/utilities/RdInput/RdStaticInput'
import { MAIN_MENU_GROUP } from '@/constants/enums'
import { HomeIcon } from '@/constants/icons'
import { TMenuDropdownProps, TMenuItem } from '@/constants/types'
import useUserByUsername from '@/hooks/useUserByUsername'
import { Box, List } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useContext, useState } from 'react'
import { renderSelectedOption } from './RenderedCbs'
import FeedsMenuList from './components/FeedsMenuList'
import PeopleMenuList from './components/PeopleMenuList'
import SubsMenuList from './components/SubsMenuList'

function MenuDropDown({ session, subName, userPageName, pathName }: TMenuDropdownProps) {
  const { userName } = useContext(AppContext)
  const [me, _, loading] = useUserByUsername(userName)
  const { pathname } = useRouter()
  const [filterTerm, setFilterTerm] = useState('')
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
      <List>
        <Box px={2}>
          <RdStaticInput autoFocus onChange={handleFilter} placeholder="Filter" />
        </Box>
      </List>

      {/* Feeds list */}
      <FeedsMenuList feedsOptions={feedsOptions} filterByTerm={filterByTerm} />

      {me && (
        <Box>
          {/* Subreddit list */}
          <SubsMenuList session={session} loading={loading} options={communityOptions} filterByTerm={filterByTerm} />
          {/* Hidden user list - A little hack for displaying unlisted Item (for profile pages) */}
          <PeopleMenuList session={session} loading={loading} options={peopleOptions} filterByTerm={filterByTerm} />
        </Box>
      )}
    </RdDropdown>
  )
}

export default MenuDropDown
