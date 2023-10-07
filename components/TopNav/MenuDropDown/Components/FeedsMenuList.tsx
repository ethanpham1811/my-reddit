import { MAIN_MENU_GROUP } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { List, ListItemText, MenuItem } from '@mui/material'
import Link from 'next/link'
import { createElement } from 'react'
import { v4 as rid } from 'uuid'
import GroupHeader from './GroupHeader'

type TFeedsMenuListProps = {
  feedsOptions: TMenuItem[]
  filterByTerm: (option: TMenuItem) => boolean
}

function FeedsMenuList({ feedsOptions, filterByTerm }: TFeedsMenuListProps) {
  return (
    <List>
      <GroupHeader label={MAIN_MENU_GROUP.Feeds} />
      {feedsOptions.filter(filterByTerm).map(({ name, icon }) => (
        <Link href="/" style={{ color: 'unset', textDecoration: 'none' }} key={`feeds_menu_${rid()}`}>
          <MenuItem value={name}>
            {icon && createElement(icon)}
            <ListItemText primary={name} />
          </MenuItem>
        </Link>
      ))}
    </List>
  )
}

export default FeedsMenuList
