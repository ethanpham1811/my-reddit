import { OnlineDotStyle } from '@/mui/styles'
import { generateSeededHexColor, generateUserImage } from '@/services'
import { Avatar, Box, CircularProgress, Skeleton } from '@mui/material'
import { User } from 'next-auth'
import { ReactNode } from 'react'

export const renderSelectedOption = (_: string, user: User | undefined, mobileMode: boolean = false): ReactNode => {
  return (
    <>
      {user ? (
        <Box display="flex" alignItems="center" gap={1}>
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
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <CircularProgress size={20} /> <Skeleton sx={{ flex: 1 }} />
        </Box>
      )}
    </>
  )
}
