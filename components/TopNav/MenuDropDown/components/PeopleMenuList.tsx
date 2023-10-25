import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP, SUB_PEOPLE_MENU_ITEM } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { ListItemText, MenuItem } from '@mui/material'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TPeopleMenuListProps = {
  value: string
  loading: boolean
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

function PeopleMenuList({ loading, options, filterByTerm, ...rest }: TPeopleMenuListProps) {
  const { session } = useAppSession()
  return (
    <>
      <GroupHeader label={MAIN_MENU_GROUP.People} />
      {session && !loading ? (
        options.length > 0 ? (
          options
            .filter(filterByTerm)
            .map(({ name }) => <SubAndPeopleMenuItem type={SUB_PEOPLE_MENU_ITEM.People} {...rest} name={name} key={`people_menu_${rid()}`} />)
        ) : (
          <MenuItem>
            <ListItemText primary="You don't follow anyone"></ListItemText>
          </MenuItem>
        )
      ) : (
        <RdSkeleton />
      )}
    </>
  )
}

export default PeopleMenuList
