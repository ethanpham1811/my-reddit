import { AppContext } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { List, ListItemText, MenuItem } from '@mui/material'
import { useContext } from 'react'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TSubsMenuListProps = {
  loading: boolean
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

function SubsMenuList({ loading, options, filterByTerm }: TSubsMenuListProps) {
  const { session } = useContext(AppContext)
  return (
    <List>
      <GroupHeader label={MAIN_MENU_GROUP.Communities} />
      {session && !loading ? (
        options.length > 0 ? (
          options.filter(filterByTerm).map(({ name }) => <SubAndPeopleMenuItem name={name} key={`communities_menu_${rid()}`} />)
        ) : (
          <MenuItem>
            <ListItemText primary="You didn't join any community"></ListItemText>
          </MenuItem>
        )
      ) : (
        <RdSkeleton />
      )}
    </List>
  )
}

export default SubsMenuList
