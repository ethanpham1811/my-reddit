import { TMenuItem } from '@/constants/types'
import { Avatar, Box } from '@/mui'
import { generateSeededHexColor, generateUserImage } from '@/src/utils'
import { ReactNode, createElement } from 'react'

export const renderSelectedOption = (
  options: TMenuItem[],
  activePage: string,
  subOrUserName: string | string[] | undefined,
  pathname: string
): ReactNode => {
  const selectedMenu = options.find((option) => option.name == activePage)
  return (
    <>
      {selectedMenu ? (
        <>
          {selectedMenu.icon ? (
            createElement(selectedMenu.icon)
          ) : (
            <Avatar
              variant="rounded"
              sx={{
                width: 20,
                height: 20,
                backgroundColor: generateSeededHexColor(selectedMenu.name),
                border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
              }}
              alt={`${selectedMenu.name} avatar`}
              src={generateUserImage(selectedMenu.name)}
            />
          )}
          <Box sx={{ display: 'block' }} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
            {`${subOrUserName ? 'r/' : ''}${selectedMenu.name}` || 'unknown'}
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'block' }} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
          {pathname === '/search' ? 'Search results' : '404'}
        </Box>
      )}
    </>
  )
}
