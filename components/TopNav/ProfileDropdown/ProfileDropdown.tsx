import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

import { useState } from 'react'

type ProfileDropdownProp = {
  session: Session | null
}

function MenuDropDown({ session }: ProfileDropdownProp) {
  const [page, setPage] = useState('home')
  function handleChange(e: SelectChangeEvent) {
    setPage(e.target.value)
  }
  return (
    <Box flex={1}>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <Select value={page} onChange={handleChange}>
          {!session ? (
            <MenuItem>
              <button onClick={() => signIn()}>login</button>
            </MenuItem>
          ) : (
            <MenuItem>
              <button onClick={() => signOut()}>logout</button>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  )
}

export default MenuDropDown
