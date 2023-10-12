import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { List, ListItemText, MenuItem } from '@mui/material'
import { Session } from 'next-auth'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TPeopleMenuListProps = {
  session: Session | null
  loading: boolean
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

function PeopleMenuList({ session, loading, options, filterByTerm }: TPeopleMenuListProps) {
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
