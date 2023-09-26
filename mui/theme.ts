import { red } from '@mui/material/colors'
import { Theme, createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

// Create a theme instance.
export const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    icon: {
      main: '#1A1A1B' // Custom color value
    },
    actionIcon: {
      main: '#878A8C' // Custom color value
    },
    hoverState: {
      main: '#0079D3' // Custom color value
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
})
