import { RdDropdown } from '@/components'
import { generateUserImage } from '@/components/utilities'
import { MenuItem } from '@mui/material'
import { Session } from 'next-auth'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { v4 as rid } from 'uuid'

type MenuProps = {
  session: Session | null
}

function ProfileDropdownProp({ session }: MenuProps) {
  const [page, setPage] = useState('home')

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

  function renderSelectedOption(_: ReactNode) {
    return (
      <>
        {session ? (
          <>
            <Image alt="profile image" src={session.user?.image || generateUserImage(session.user?.name || 'seed')} width={20} height={20} />
            {session.user?.name || 'unknown'}
          </>
        ) : (
          <div></div>
        )}
      </>
    )
  }

  return (
    <RdDropdown renderSelectedOption={renderSelectedOption} selectedKey={page} setSelectedKey={setPage}>
      {session && list.length > 0 ? (
        list.map((item) => {
          return (
            <MenuItem value={item.value} key={`menu_${rid()}`}>
              <Image alt={`${item.name} image`} src={generateUserImage(item.name || 'seed')} width={20} height={20} />
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
