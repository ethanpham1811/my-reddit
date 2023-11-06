import { MAIN_MENU_GROUP } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { ListItemText, MenuItem } from '@/mui'
import Link from 'next/link'
import { createElement } from 'react'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'

type TFeedsMenuListProps = {
  value: string
  feedsOptions: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

/**
 * Feed group, Currently has only 1 option: "Home"
 */
function FeedsMenuList({ feedsOptions, filterByTerm, ...rest }: TFeedsMenuListProps) {
  return (
    <>
      <GroupHeader label={MAIN_MENU_GROUP.Feeds} />
      {feedsOptions.filter(filterByTerm).map(({ name, icon }) => (
        <Link href="/" style={{ color: 'unset', textDecoration: 'none' }} key={`feeds_menu_${rid()}`}>
          <MenuItem {...rest}>
            {icon && createElement(icon)}
            <ListItemText primary={name} />
          </MenuItem>
        </Link>
      ))}
    </>
  )
}

export default FeedsMenuList
