import { SUB_PEOPLE_MENU_ITEM } from '@/constants/enums'
import { generateSeededHexColor, generateUserImage } from '@/services'
import { Avatar, ListItemText, MenuItem } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

function SubAndPeopleMenuItem({ type, name, ...rest }: { type: SUB_PEOPLE_MENU_ITEM; name: string; value: string }) {
  let url = '/'
  if (type === SUB_PEOPLE_MENU_ITEM.Communities) url = `/r/${name}`
  if (type === SUB_PEOPLE_MENU_ITEM.People) url = `/u/${name}`

  return (
    <Link href={url} style={{ color: 'unset', textDecoration: 'none' }}>
      <MenuItem {...rest} value={name}>
        <Avatar variant="circular" sx={{ bgcolor: generateSeededHexColor(name), width: 20, height: 20 }}>
          <Image src={generateUserImage(name)} alt={`community ${name} avatar`} aria-label={`community ${name} avatar`} width={20} height={20} />
        </Avatar>
        <ListItemText primary={`r/${name}`} />
      </MenuItem>
    </Link>
  )
}

export default SubAndPeopleMenuItem
