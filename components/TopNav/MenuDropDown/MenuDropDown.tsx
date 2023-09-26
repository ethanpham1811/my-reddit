import { RdDropdown } from '@/components'
import { generateUserImage } from '@/components/utilities'
import { HomeIcon } from '@/constants'
import { MenuItem } from '@mui/material'
import { Session } from 'next-auth'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { v4 as rid } from 'uuid'

type MenuProps = {
  session: Session | null
}
type MenuItem = {
  name: string
  value: string
  icon: ReactNode | null
}

function MenuDropDown({ session }: MenuProps) {
  const [page, setPage] = useState('home')

  const list: MenuItem[] = [
    {
      name: 'Home',
      value: 'home',
      icon: <HomeIcon />
    },
    {
      name: 'Ai generated arts',
      value: 'ai',
      icon: null
    }
  ]

  function renderSelectedOption(selectedValue: ReactNode) {
    const seletedItem = list.find((item) => item.value == selectedValue)
    return (
      <>
        {seletedItem ? (
          <>
            {seletedItem.icon ?? (
              <Image alt={`${seletedItem.name} image`} src={generateUserImage(seletedItem.name || 'seed')} width={20} height={20} />
            )}
            {seletedItem.name || 'unknown'}
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
              {item.icon ?? <Image alt={`${item.name} image`} src={generateUserImage(item.name || 'seed')} width={20} height={20} />}
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

export default MenuDropDown
