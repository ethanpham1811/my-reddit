import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP, SUB_PEOPLE_MENU_ITEM } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { Divider, ListItemText, MenuItem } from '@mui/material'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TSubsMenuListProps = {
  value: string
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

/**
 * Community group, list all user's subreddits
 */
function SubsMenuList({ options, filterByTerm, ...rest }: TSubsMenuListProps) {
  const { loading, session } = useAppSession()

  return (
    <>
      {/* Mui Select need MenuItem to be it's direct child to work, don't merge these condition */}
      {session && <Divider sx={{ my: 1 }} />}
      {session && <GroupHeader label={MAIN_MENU_GROUP.Communities} />}
      {!session ? null : loading ? (
        <RdSkeleton />
      ) : options.length > 0 ? (
        options
          .filter(filterByTerm)
          .map(({ name }) => <SubAndPeopleMenuItem type={SUB_PEOPLE_MENU_ITEM.Communities} {...rest} name={name} key={`communities_menu_${rid()}`} />)
      ) : (
        <MenuItem>
          <ListItemText primary="You didn't join any community"></ListItemText>
        </MenuItem>
      )}
    </>
  )
}

export default SubsMenuList
