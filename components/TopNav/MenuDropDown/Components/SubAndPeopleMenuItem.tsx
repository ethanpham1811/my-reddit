import { generateSeededHexColor, generateUserImage } from '@/components/utilities'
import { Avatar, ListItemText, MenuItem } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

function SubAndPeopleMenuItem({ name }: { name: string }) {
  return (
    <Link href={`/r/${name}`} style={{ color: 'unset', textDecoration: 'none' }}>
      <MenuItem value={name}>
        <Avatar variant="circular" sx={{ bgcolor: generateSeededHexColor(name), width: 20, height: 20 }}>
          <Image src={generateUserImage(name)} alt={`community ${name} avatar`} aria-label={`community ${name} avatar`} width={20} height={20} />
        </Avatar>
        <ListItemText primary={`r/${name}`} />
      </MenuItem>
    </Link>
  )
}

export default SubAndPeopleMenuItem
