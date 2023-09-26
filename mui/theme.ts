import { red } from '@mui/material/colors'
import { Theme, createTheme } from '@mui/material/styles'
import { IBM_Plex_Sans } from 'next/font/google'

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '700'],
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
      main: '#DAE0E6'
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
    },
    inputBgOutfocused: {
      main: '#F6F7F8' // Custom color value
    },
    inputBorder: {
      main: '#EDEFF1' // Custom color value
    }
  },
  typography: {
    fontFamily: ibmPlexSans.style.fontFamily,
    fontSize: 12.25
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // ...darkScrollbar(),
          backgroundColor: '#DAE0E6',
          fontSize: '1rem'
        }
      }
    }
  }
})
