import { styled } from '@mui/material/styles'

export const SearchIconWrapper = withTheme(
  styled('div')(({ theme }) => ({
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: {
      color: theme.palette.primary
    }
  }))
)
