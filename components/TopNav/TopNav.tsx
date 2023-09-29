import { AppBar, Box, Stack, styled } from '@mui/material'
import { useSession } from 'next-auth/react'
import { IconBox, Logo, MenuDropDown, ProfileDropdown, SearchBar } from '..'

const NavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`
  }
})

function TopNav() {
  const { data: session, status } = useSession()

  return (
    <Box flexGrow={1}>
      <NavBar>
        <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
            <Logo />
            {/* dropdown */}
            <MenuDropDown session={session} />
          </Stack>
          {/* search */}
          <SearchBar />
          {/* Icons */}
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
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
