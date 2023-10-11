import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { List, ListItemText, MenuItem } from '@mui/material'
import { Session } from 'next-auth'
import { v4 as rid } from 'uuid'
import GroupHeader from './GroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TSubsMenuListProps = {
  session: Session | null
  loading: boolean
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

function SubsMenuList({ session, loading, options, filterByTerm }: TSubsMenuListProps) {
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
