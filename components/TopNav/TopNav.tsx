import { useAppSession } from '@/components/Layouts/MainLayout'
import { AppBar, Box, Stack, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { IconBox, Logo, MenuDropDown, ProfileDropdown, SearchBar } from '..'
import LoginButton from './LoginButton/LoginButton'

const NavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`
  }
})

function TopNav() {
  const { session, loading } = useAppSession()
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
            {session && <ProfileDropdown loading={loading} />}
            {!session && <LoginButton />}
          </Stack>
        </Stack>
      </NavBar>
    </Box>
  )
}

export default TopNav
