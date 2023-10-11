import { SESSION_STATUS } from '@/constants/enums'
import { TSession } from '@/constants/types'
import { AppBar, Box, Stack, styled } from '@mui/material'
import { NextRouter } from 'next/router'
import { IconBox, Logo, MenuDropDown, ProfileDropdown, SearchBar } from '..'
import LoginButton from './LoginButton/LoginButton'

const NavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`
  }
})

type TTopNavProps = {
  session: TSession
  router: NextRouter
}

function TopNav({ session, router }: TTopNavProps) {
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
            <MenuDropDown session={session.data} subName={subName} userPageName={username} pathName={pathName} />
          </Stack>
          {/* search */}
          <SearchBar session={session.data} subOrUserName={subName ?? username} pathName={pathName} navigate={navigate} />
          {/* Icons */}
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
            <IconBox />
            {/* Profile dropdown */}
            {session.status === SESSION_STATUS.Authenticated && <ProfileDropdown session={session.data} navigate={navigate} />}
            {session.status === SESSION_STATUS.Unauthenticated && <LoginButton />}
          </Stack>
        </Stack>
      </NavBar>
    </Box>
  )
}

export default TopNav
