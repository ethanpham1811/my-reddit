import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP, SUB_PEOPLE_MENU_ITEM } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { ListItemText, MenuItem } from '@mui/material'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TSubsMenuListProps = {
  value: string
  loading: boolean
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

function SubsMenuList({ loading, options, filterByTerm, ...rest }: TSubsMenuListProps) {
  const { session } = useAppSession()
  return (
    <>
      <GroupHeader label={MAIN_MENU_GROUP.Communities} />
      {session && !loading ? (
        options.length > 0 ? (
          options
            .filter(filterByTerm)
            .map(({ name }) => (
              <SubAndPeopleMenuItem type={SUB_PEOPLE_MENU_ITEM.Communities} {...rest} name={name} key={`communities_menu_${rid()}`} />
            ))
        ) : (
          <MenuItem>
            <ListItemText primary="You didn't join any community"></ListItemText>
          </MenuItem>
        )
      ) : (
        <RdSkeleton />
      )}
    </>
  )
}

export default SubsMenuList
