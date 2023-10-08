import { generateSeededHexColor, generateUserImage } from '@/components/utilities'
import { TMenuItem } from '@/constants/types'
import { Avatar, Box } from '@mui/material'
import { ReactNode, createElement } from 'react'

export const renderSelectedOption = (
  value: string,
  mobileMode: boolean,
  options: TMenuItem[],
  activePage: string,
  subOrUserName: string | string[] | undefined
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
          <Box sx={{ display: { xs: 'none', lg: 'block' } }} display="block" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
            {`${subOrUserName ? 'r/' : ''}${selectedMenu.name}` || 'unknown'}
          </Box>
        </>
      ) : (
        <div></div>
      )}
    </>
  )
}