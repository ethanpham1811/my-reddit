import { RdDropdown } from '@/components'
import { generateUserImage } from '@/components/utilities'
import { MenuItem } from '@mui/material'
import { Session } from 'next-auth'
import Image from 'next/image'
import { useState } from 'react'
import { v4 as rid } from 'uuid'

type TMenuProps = {
  session: Session | null
}

function ProfileDropdownProp({ session }: TMenuProps) {
  const [page, setPage] = useState('home')
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

  function renderSelectedOption(_: string) {
    return (
      <>
        {session ? (
          <>
            <Image alt="profile image" src={session.user?.image || generateUserImage(session.user?.name)} width={20} height={20} />
            {session.user?.name || 'unknown'}
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
      renderSelectedOption={renderSelectedOption}
      value={page}
      onChange={(e) => setPage(e.target.value)}
      flex={1}
      sx={{ minWidth: '200px' }}
    >
      {session && list.length > 0 ? (
        list.map((item) => {
          return (
            <MenuItem value={item.value} key={`menu_${rid()}`}>
              <Image alt={`${item.name} image`} src={generateUserImage(item.name)} width={20} height={20} />
              {item.name || 'unknown'}
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
