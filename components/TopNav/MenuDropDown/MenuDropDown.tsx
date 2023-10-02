import { RdDropdown } from '@/components'
import { generateUserImage } from '@/components/utilities'
import { HomeIcon } from '@/constants/icons'
import { TMenuItem, TMenuProps } from '@/constants/types'
import { MenuItem } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { v4 as rid } from 'uuid'

function MenuDropDown({ session }: TMenuProps) {
  const [page, setPage] = useState('home')
  const loading = false
  const list: TMenuItem[] = [
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

  function renderSelectedOption(selectedValue: string) {
    const seletedItem = list.find((item) => item.value == selectedValue)
    return (
      <>
        {seletedItem ? (
          <>
            {seletedItem.icon ?? <Image alt={`${seletedItem.name} image`} src={generateUserImage(seletedItem.name)} width={20} height={20} />}
            {seletedItem.name || 'unknown'}
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
              {item.icon ?? <Image alt={`${item.name} image`} src={generateUserImage(item.name)} width={20} height={20} />}
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
