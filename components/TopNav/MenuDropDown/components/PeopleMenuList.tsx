import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { List, ListItemText, MenuItem } from '@mui/material'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TPeopleMenuListProps = {
  loading: boolean
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

function PeopleMenuList({ loading, options, filterByTerm }: TPeopleMenuListProps) {
  const { session } = useAppSession()
  return (
    <List>
      <GroupHeader label={MAIN_MENU_GROUP.CurrentPage} />
      {session && !loading ? (
        options.length > 0 ? (
          options.filter(filterByTerm).map(({ name }) => <SubAndPeopleMenuItem name={name} key={`people_menu_${rid()}`} />)
        ) : (
          <MenuItem>
            <ListItemText primary="You don't follow anyone"></ListItemText>
          </MenuItem>
        )
      ) : (
        <RdSkeleton />
      )}
    </List>
  )
}

export default PeopleMenuList
