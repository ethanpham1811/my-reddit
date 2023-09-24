import { generateUserImage } from '@/components/utilities'
import { HomeIcon } from '@/constants'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Session } from 'next-auth'
import Image from 'next/image'
import { useState } from 'react'

type MenuProps = {
  session: Session | null
}

function MenuDropDown({ session }: MenuProps) {
  const [page, setPage] = useState('home')
  function handleChange(e: SelectChangeEvent) {
    setPage(e.target.value)
  }
  return (
    <section>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <Select value={page} onChange={handleChange}>
          <MenuItem value="home">
            <HomeIcon />
            <em>Home</em>
          </MenuItem>
          {session && (
            <MenuItem value="profile">
              <Image alt="profile image" src={session.user?.image || generateUserImage(session.user?.name || 'seed')} width={20} height={20} />
              <em>Profile</em>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </section>
  )
}

export default MenuDropDown
