import { useAppSession } from '@/components/Layouts/MainLayout'
import { MOBILE_CUSTOM_BREAKPOINT } from '@/constants/enums'
import { AppBar, Box, Stack, styled, useMediaQuery, useTheme } from '@/mui'
import { useRouter } from 'next/router'
import { IconBox, Logo, MenuDropDown, ProfileDropdown, SearchBar } from '..'
import LoginButton from './LoginButton/LoginButton'

const NavBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: theme.palette.white.main,
    boxShadow: 'none',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`
  }
})

function TopNav({ sessionUsername }: { sessionUsername: string | undefined }) {
  const { session, loading } = useAppSession()
  const { breakpoints } = useTheme()
  const router = useRouter()
  const {
    query: { subreddit: subName, username },
    pathname: pathName,
    push: navigate
  } = router
  const lgMobile = useMediaQuery(breakpoints.down('lg'))
  const customLgMobile = useMediaQuery(MOBILE_CUSTOM_BREAKPOINT.Lg)
  const customMdMobile = useMediaQuery(MOBILE_CUSTOM_BREAKPOINT.Md)

  return (
    <Box flexGrow={1} id="top-nav">
      <NavBar>
        <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1} sx={{ justifyContent: 'flex-start' }}>
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={{ sx: 0, md: 1 }} flex={customMdMobile ? 1 : 0}>
            <Logo />
            {/* dropdown */}
            <MenuDropDown subName={subName} userPageName={username} pathName={pathName} />
          </Stack>
          {/* search */}
          <SearchBar isMobile={customLgMobile} subOrUserName={subName ?? username} navigate={navigate} />
          {/* Icons */}
          <Stack direction="row" useFlexGap justifyContent="center" alignItems="center" spacing={1} pr={1}>
            <IconBox isMobile={customMdMobile} />
            {/* Profile dropdown */}
            {session && <ProfileDropdown isMobile={lgMobile} loading={loading} sessionUsername={sessionUsername} />}
            {!session && <LoginButton />}
          </Stack>
        </Stack>
      </NavBar>
    </Box>
  )
}

export default TopNav
