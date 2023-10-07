import { TUseSubredditListResponse } from '@/constants/types'
import { AppBar, Box, Stack, styled } from '@mui/material'
import { Session } from 'next-auth'
import { NextRouter } from 'next/router'
import { IconBox, Logo, MenuDropDown, ProfileDropdown, SearchBar } from '..'

const NavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`
  }
})

type TTopNavProps = {
  subListData: TUseSubredditListResponse
  session: Session | null
  router: NextRouter
}

function TopNav({ subListData, session, router }: TTopNavProps) {
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
            <MenuDropDown session={session} subName={subName} userName={username} pathName={pathName} subListData={subListData} />
          </Stack>
          {/* search */}
          <SearchBar session={session} subOrUserName={subName ?? username} pathName={pathName} navigate={navigate} />
          {/* Icons */}
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
            <IconBox />
            {/* Profile dropdown */}
            <ProfileDropdown session={session} navigate={navigate} />
          </Stack>
        </Stack>
      </NavBar>
    </Box>
  )
}

export default TopNav
