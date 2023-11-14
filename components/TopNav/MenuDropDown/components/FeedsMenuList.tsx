import { MAIN_MENU_GROUP } from '@/constants/enums'
import { TMenuItem } from '@/constants/types'
import { ListItemText, MenuItem } from '@/mui'
import Link from 'next/link'
import { ForwardedRef, KeyboardEvent, ReactElement, createElement, forwardRef } from 'react'
import { v4 as rid } from 'uuid'
import GroupHeader from './MenuGroupHeader'

type TFeedsMenuListProps = {
  value: string
  options: TMenuItem[]
  onEnter: (e: KeyboardEvent<HTMLLIElement>, url: string) => void
}

/**
 * Feed group, Currently has only 1 option: "Home"
 */
const FeedsMenuList = ({ options, onEnter, ...rest }: TFeedsMenuListProps, ref: ForwardedRef<HTMLLIElement> | null) => {
  return (
    <>
      <GroupHeader label={MAIN_MENU_GROUP.Feeds} />
      {options.map(({ name, icon, url }) => (
        <MenuItem ref={ref} {...rest} key={`feeds_menu_${rid()}`} onKeyDown={(e) => onEnter(e, url || '/')}>
          <Link href={url || '/'} style={{ color: 'unset', textDecoration: 'none', flex: 1, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {icon && createElement(icon)}|
            <ListItemText primary={name} />
          </Link>
        </MenuItem>
      ))}
    </>
  )
}

export default forwardRef(FeedsMenuList) as (p: TFeedsMenuListProps & { ref: ForwardedRef<HTMLLIElement> | null }) => ReactElement
