import { SUB_PEOPLE_MENU_ITEM } from '@/constants/enums'
import { Avatar, ListItemText, MenuItem } from '@/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/utils'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Menu item for communities and people
 */
function SubAndPeopleMenuItem({ type, name, ...rest }: { type: SUB_PEOPLE_MENU_ITEM; name: string; value: string }) {
  const prefix = type === SUB_PEOPLE_MENU_ITEM.Communities ? 'r' : 'u'

  return (
    <Link href={`/${prefix}/${name}`} style={{ color: 'unset', textDecoration: 'none' }}>
      <MenuItem {...rest} value={name}>
        <Avatar variant="circular" sx={{ bgcolor: generateSeededHexColor(name), width: 20, height: 20 }}>
          <Image src={generateUserImage(name)} alt={`community ${name} avatar`} aria-label={`community ${name} avatar`} width={20} height={20} />
        </Avatar>
        <ListItemText primary={`${prefix}/${name}`} />
      </MenuItem>
    </Link>
  )
}

export default SubAndPeopleMenuItem
