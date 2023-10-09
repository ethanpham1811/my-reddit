import { CardLogout, RdDialog, RdDropdown } from '@/components'
import { LogoutIcon, PersonIcon } from '@/constants/icons'
import { TProfileDropdownProps } from '@/constants/types'
import { OnlineDotStyle } from '@/mui/styles'
import { generateSeededHexColor, generateUserImage } from '@/services'
import { Avatar, Box, MenuItem } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { v4 as rid } from 'uuid'

function ProfileDropdownProp({ session, navigate }: TProfileDropdownProps) {
  // const [page, setPage] = useState('home')
  const [isOpenedLogoutDialog, setIsOpenedLogoutDialog] = useState(false)
  const user = session?.user

  const list = [
    {
      name: 'Profile',
      value: 'profile',
      url: `/u/${user?.name}`
    },
    {
      name: 'Ai generated arts',
      value: 'ai',
      url: '/u/Ok_SuMetal4423'
    }
  ]

  function renderSelectedOption(_: string, mobileMode: boolean = false) {
    return (
      <>
        {user ? (
          <>
            <OnlineDotStyle
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              sx={{ '.MuiBadge-badge': { width: mobileMode ? 7 : 10, height: mobileMode ? 7 : 10 } }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: generateSeededHexColor(user.name),
                  border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
                }}
                alt={`${user.name} avatar`}
                src={generateUserImage(user.name)}
              />
            </OnlineDotStyle>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>{user.name}</Box>
          </>
        ) : (
          <div></div>
        )}
      </>
    )
  }

  return (
    <RdDropdown
      // value={page}
      flex={1}
      mobileMode
      minWidth="200px"
      borderColor="inputBorder"
      renderSelectedOption={renderSelectedOption}
    >
      {session && list.length > 0 ? (
        list.map(({ name, value, url }) => {
          return (
            <Link href={url} key={`menu_${rid()}`} style={{ textDecoration: 'none', color: 'unset' }}>
              <MenuItem value={value} sx={{ '&.MuiButtonBase-root': { justifyContent: 'flex-end' } }}>
                {name || 'unknown'}
                <PersonIcon />
              </MenuItem>
            </Link>
          )
        })
      ) : (
        <div></div>
      )}
      <MenuItem
        sx={{
          '&.MuiButtonBase-root': { fontWeight: 600, justifyContent: 'flex-end', color: 'orange.main', '&:hover': { bgcolor: 'primary.main' } }
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setIsOpenedLogoutDialog(true)
        }}
      >
        Logout
        <LogoutIcon />
      </MenuItem>
      <RdDialog open={isOpenedLogoutDialog} setOpen={setIsOpenedLogoutDialog}>
        <CardLogout setOpen={setIsOpenedLogoutDialog} />
      </RdDialog>
    </RdDropdown>
  )
}

export default ProfileDropdownProp
