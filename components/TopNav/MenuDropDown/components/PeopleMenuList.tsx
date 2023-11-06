import { useAppSession } from '@/components/Layouts/MainLayout'
import { RdSkeleton } from '@/components/Skeletons'
import { MAIN_MENU_GROUP, SUB_PEOPLE_MENU_ITEM } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { Box, Divider, Typography } from '@/mui'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TPeopleMenuListProps = {
  value: string
  options: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

/**
 * People group, list all user's following
 */
function PeopleMenuList({ options, filterByTerm, ...rest }: TPeopleMenuListProps) {
  const { session, loading } = useAppSession()

  return (
    <>
      {/* Mui Select need MenuItem to be it's direct child to work, don't merge these condition */}
      {session && <Divider sx={{ my: 1 }} />}
      {session && <GroupHeader label={MAIN_MENU_GROUP.People} />}
      {!session ? null : loading ? (
        <RdSkeleton />
      ) : options.length > 0 ? (
        options
          .filter(filterByTerm)
          .map(({ name }) => <SubAndPeopleMenuItem type={SUB_PEOPLE_MENU_ITEM.People} {...rest} name={name} key={`people_menu_${rid()}`} />)
      ) : (
        <Box px={2} py={0.75}>
          <Typography variant="body1">You are not following anyone</Typography>
        </Box>
      )}
    </>
  )
}

export default PeopleMenuList
