import { RdDropdown } from '@/components'
import { generateSeededHexColor, generateUserImage } from '@/components/utilities'
import { TProfileDropdownProps } from '@/constants/types'
import { OnlineDotStyle } from '@/mui/styles'
import { Avatar, Box, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { v4 as rid } from 'uuid'

function ProfileDropdownProp({ session }: TProfileDropdownProps) {
  const [page, setPage] = useState('home')
  const user = session?.user
  const loading = false

  const list = [
    {
      name: 'Home',
      value: 'home'
    },
    {
      name: 'Ai generated arts',
      value: 'ai'
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
      loading={loading}
      value={page}
      flex={1}
      mobileMode
      minWidth="200px"
      borderColor="inputBorder"
      onChange={(e) => setPage(e.target.value)}
      renderSelectedOption={renderSelectedOption}
    >
      {session && list.length > 0 ? (
        list.map(({ name, value }) => {
          return (
            <MenuItem value={value} key={`menu_${rid()}`}>
              <Image alt={`${name} image`} src={generateUserImage(name)} width={20} height={20} />
              {name || 'unknown'}
            </MenuItem>
          )
        })
      ) : (
        <div></div>
      )}
    </RdDropdown>
  )
}

export default ProfileDropdownProp
