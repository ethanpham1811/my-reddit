import { OnlineDotStyle } from '@/mui/styles'
import { generateSeededHexColor, generateUserImage } from '@/services'
import { Avatar, Box, CircularProgress, Skeleton } from '@mui/material'

import { ReactNode } from 'react'

export const renderSelectedOption = (_: string, username: string | undefined, loading: boolean, mobileMode: boolean = false): ReactNode => {
  return (
    <>
      {loading ? (
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <CircularProgress size={20} /> <Skeleton sx={{ flex: 1 }} />
        </Box>
      ) : (
        username && (
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
                  backgroundColor: generateSeededHexColor(username),
                  border: (theme): string => `1px solid ${theme.palette.inputBorder.main}`
                }}
                alt={`${username} avatar`}
                src={generateUserImage(username)}
              />
            </OnlineDotStyle>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>{username}</Box>
          </Box>
        )
      )}
    </>
  )
}
