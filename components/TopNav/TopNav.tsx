import { AppBar, Box, Stack, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IconBox, Logo, MenuDropDown, ProfileDropdown, SearchBar } from '..'
import { AppContext } from '../Layouts/MainLayout'
import LoginButton from './LoginButton/LoginButton'

const NavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`
  }
})

function TopNav() {
  const { session } = useContext(AppContext)
  const router = useRouter()
  const {
    query: { subreddit: subName, username },
    pathname: pathName,
    push: navigate
  } = router
  return (
    <Box flexGrow={1}>
      <NavBar>
        <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1} sx={{ justifyContent: 'flex-start' }}>
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
            <Logo />
            {/* dropdown */}
            <MenuDropDown subName={subName} userPageName={username} pathName={pathName} />
          </Stack>
          {/* search */}
          <SearchBar subOrUserName={subName ?? username} pathName={pathName} navigate={navigate} />
          {/* Icons */}
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
            <IconBox />
            {/* Profile dropdown */}
            <ProfileDropdown navigate={navigate} />
            {!session && <LoginButton />}
          </Stack>
        </Stack>
      </NavBar>
    </Box>
  )
}

export default TopNav
