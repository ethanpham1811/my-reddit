import { RdDropdown } from '@/components'
import RdStaticInput from '@/components/utilities/RdInput/RdStaticInput'
import { MAIN_MENU_GROUP, SESSION_STATUS } from '@/constants/enums'
import { HomeIcon } from '@/constants/icons'
import { TMenuDropdownProps, TMenuItem, TSession } from '@/constants/types'
import { Box, List } from '@mui/material'
import { useSession } from 'next-auth/react'
import { ReactNode, useState } from 'react'
import { renderSelectedOption } from './RenderedCbs'
import FeedsMenuList from './components/FeedsMenuList'
import PeopleMenuList from './components/PeopleMenuList'
import SubsMenuList from './components/SubsMenuList'

function MenuDropDown({ session, subListData, subName, userName, pathName }: TMenuDropdownProps) {
  const { status }: TSession = useSession()
  const { subredditList, loading, error } = subListData
  const [filterTerm, setFilterTerm] = useState('')

  const activePage: string = pathName === '/' ? 'Home' : (userName as string) ?? (subName as string)

  /* Mock data--------------------------------- */
  const feedsOptions: TMenuItem[] = [
    {
      name: 'Home',
      icon: HomeIcon,
      group: MAIN_MENU_GROUP.Feeds
    }
  ]
  const communityOptions: TMenuItem[] = subredditList
    ? subredditList.map(({ name }): TMenuItem => {
        return { name, group: MAIN_MENU_GROUP.Communities }
      })
    : []
  const peopleOptions: TMenuItem[] = userName
    ? [
        {
          name: activePage,
          group: MAIN_MENU_GROUP.People
        }
      ]
    : []
  /* End Mock data----------------------- */

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterTerm(e.target.value)
  }

  const filterByTerm = (option: TMenuItem): boolean => option.name.toLowerCase().includes(filterTerm.toLowerCase())
  const handleRenderSelectedOption = (value: string): ReactNode =>
    renderSelectedOption(value, true, [...feedsOptions, ...communityOptions, ...peopleOptions], activePage, subName)

  return (
    <RdDropdown
      renderSelectedOption={handleRenderSelectedOption}
      value={activePage}
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

      {status === SESSION_STATUS.Authenticated && (
        <>
          {/* Subreddit list */}
          <SubsMenuList session={session} loading={loading} options={communityOptions} filterByTerm={filterByTerm} />
          {/* Hidden user list - A little hack for displaying unlisted Item (for profile pages) */}
          <PeopleMenuList session={session} loading={loading} options={peopleOptions} filterByTerm={filterByTerm} />
        </>
      )}
    </RdDropdown>
  )
}

export default MenuDropDown
