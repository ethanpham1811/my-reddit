import { AppBar, Box, Stack, styled } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import { IconBox, Logo, MenuDropDown, ProfileDropdown, SearchBar } from '..'

const NavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: '4px 1rem'
  }
})

function TopNav() {
  const theme = useTheme()
  const { data: session, status } = useSession()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar>
        <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={2}>
          <Stack flex={1} direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={2}>
            <Logo />
            {/* dropdown */}
            <MenuDropDown session={session} />
          </Stack>
          {/* search */}
          <SearchBar />
          {/* Icons */}
          <Stack flex={1.5} direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={2}>
            <IconBox />
            {/* Profile dropdown */}
            <ProfileDropdown session={session} />
          </Stack>
        </Stack>
      </NavBar>
    </Box>
  )
}

export default TopNav
