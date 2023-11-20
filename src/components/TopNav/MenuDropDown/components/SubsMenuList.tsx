import { useAppSession } from '@/src/Layouts/MainLayout'
import { RdSkeleton } from '@/src/components/Skeletons'
import { MAIN_MENU_GROUP, SUB_PEOPLE_MENU_ITEM } from '@/src/constants/enums'
import { TMenuItem } from '@/src/constants/types'
import { Box, Divider, Typography } from '@/src/mui'
import { KeyboardEvent } from 'react'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'
import SubAndPeopleMenuItem from './SubAndPeopleMenuItem'

type TSubsMenuListProps = {
  options: TMenuItem[]
  onEnter: (e: KeyboardEvent<HTMLLIElement>, url: string) => void
}

/**
 * Community group, list all user's subreddits
 */
function SubsMenuList({ options, onEnter, ...rest }: TSubsMenuListProps) {
  const { loading, session } = useAppSession()

  return (
    <>
      {/* Mui Select need MenuItem to be it's direct child to work, don't merge these condition */}
      {session && <Divider sx={{ my: 1 }} />}
      {session && <GroupHeader label={MAIN_MENU_GROUP.Communities} />}
      {!session ? null : loading ? (
        <RdSkeleton />
      ) : options.length > 0 ? (
        options.map(({ name, url }) => (
          <SubAndPeopleMenuItem
            type={SUB_PEOPLE_MENU_ITEM.Communities}
            onEnter={onEnter}
            url={url || ''}
            {...rest}
            name={name}
            key={`communities_menu_${rid()}`}
          />
        ))
      ) : (
        <Box px={2} py={0.75}>
          <Typography variant="body1">You did not join any subreddit</Typography>
        </Box>
      )}
    </>
  )
}

export default SubsMenuList
