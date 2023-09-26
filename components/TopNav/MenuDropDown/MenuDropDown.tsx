import { generateUserImage } from '@/components/utilities'
import { HomeIcon } from '@/constants'
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, styled } from '@mui/material'
import { Session } from 'next-auth'

import Image from 'next/image'
import { useState } from 'react'

type MenuProps = {
  session: Session | null
}

const ListItem = styled(MenuItem)(() => {
  return { padding: '0 1rem', fontStyle: 'normal' }
})

function MenuDropDown({ session }: MenuProps) {
  const [page, setPage] = useState('home')
  function handleChange(e: SelectChangeEvent) {
    setPage(e.target.value)
  }
  return (
    <Box flex={1}>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <Select value={page} onChange={handleChange} sx={{ '.MuiSelect-select': { paddingY: 0, paddingX: '0.4rem' } }}>
          <ListItem value="home">
            <Button sx={{ textTransform: 'none' }} color="inherit" startIcon={<HomeIcon />}>
              Home
            </Button>
          </ListItem>
          {session && (
            <ListItem value="profile">
              <Button
                sx={{ textTransform: 'none' }}
                color="inherit"
                startIcon={
                  <Image alt="profile image" src={session.user?.image || generateUserImage(session.user?.name || 'seed')} width={20} height={20} />
                }
              >
                Profile
              </Button>
            </ListItem>
          )}
        </Select>
      </FormControl>
    </Box>
  )
}

export default MenuDropDown
