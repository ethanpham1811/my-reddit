import { TUseSubredditListResponse } from '@/constants/types'
import { AppBar, Box, Stack, styled } from '@mui/material'
import { Session } from 'next-auth'
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
  subName: string | string[] | undefined
  pathName: string
}

function TopNav({ subListData, session, subName, pathName }: TTopNavProps) {
  return (
    <Box flexGrow={1}>
      <NavBar>
        <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1} sx={{ justifyContent: 'flex-start' }}>
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1}>
            <Logo />
            {/* dropdown */}
            <MenuDropDown session={session} subName={subName} pathName={pathName} subListData={subListData} />
          </Stack>
          {/* search */}
          <SearchBar session={session} subName={subName} pathName={pathName} />
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
