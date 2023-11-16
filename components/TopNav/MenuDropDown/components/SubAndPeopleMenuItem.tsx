import { SUB_PEOPLE_MENU_ITEM } from '@/constants/enums'
import { Avatar, Box, ListItemText, MenuItem } from '@/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/utils'
import Image from 'next/image'
import Link from 'next/link'
import { KeyboardEvent } from 'react'

type TSubAndPeopleMenuItemProps = {
  type: SUB_PEOPLE_MENU_ITEM
  name: string
  url: string
  onEnter: (e: KeyboardEvent<HTMLLIElement>, url: string) => void
}

/**
 * Menu item for communities and people
 */
function SubAndPeopleMenuItem({ type, name, url, onEnter, ...rest }: TSubAndPeopleMenuItemProps) {
  const prefix = type === SUB_PEOPLE_MENU_ITEM.Communities ? 'r' : 'u'

  return (
    <MenuItem sx={{ minHeight: 'auto' }} {...rest} onKeyDown={(e) => onEnter(e, url)}>
      <Link href={url} style={{ color: 'unset', textDecoration: 'none', flex: 1, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Avatar variant="circular" sx={{ bgcolor: generateSeededHexColor(name), width: 20, height: 20 }}>
          <Image src={generateUserImage(name)} alt={`community ${name} avatar`} aria-label={`community ${name} avatar`} width={20} height={20} />
        </Avatar>
        <Box position="absolute" color="transparent">
          |
        </Box>
        <ListItemText primary={`${prefix}/${name}`} />
      </Link>
    </MenuItem>
  )
}

export default SubAndPeopleMenuItem
