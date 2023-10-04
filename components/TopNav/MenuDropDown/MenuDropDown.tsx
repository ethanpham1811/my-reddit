import { RdDropdown } from '@/components'
import { generateUserImage } from '@/components/utilities'
import { HomeIcon } from '@/constants/icons'
import { TMenuDropdownProps, TMenuItem } from '@/constants/types'
import { MenuItem, SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { v4 as rid } from 'uuid'

function MenuDropDown({ session, subredditListData }: TMenuDropdownProps) {
  const { subredditList, loading, error } = subredditListData
  const {
    query: { subreddit },
    pathname,
    push: navigate
  } = useRouter()
  const activePage: string = pathname === '/' ? 'Home' : (subreddit as string)
  const list: TMenuItem[] = [
    {
      name: 'Home',
      icon: <HomeIcon />
    },
    ...(subredditList ?? [])
  ]

  function renderSelectedOption(selectedValue: string) {
    const selectedItem = list.find((item) => item.name == selectedValue)
    return (
      <>
        {selectedItem ? (
          <>
            {selectedItem.icon ?? <Image alt={`${selectedItem.name} image`} src={generateUserImage(selectedItem.name)} width={20} height={20} />}
            {selectedItem.name || 'unknown'}
          </>
        ) : (
          <div></div>
        )}
      </>
    )
  }

  const onChange = (e: SelectChangeEvent<string>) => {
    const name = e.target.value
    navigate(name === 'Home' ? '/' : `/r/${name}`)
  }

  return (
    <RdDropdown
      loading={loading}
      renderSelectedOption={renderSelectedOption}
      value={activePage}
      onChange={onChange}
      flex={1}
      sx={{ minWidth: '200px' }}
    >
      {session && list.length > 0 ? (
        list.map((item) => {
          return (
            <MenuItem value={item.name} key={`menu_${rid()}`}>
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
