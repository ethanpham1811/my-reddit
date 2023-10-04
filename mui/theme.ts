import { red } from '@mui/material/colors'
import { Theme, createTheme } from '@mui/material/styles'
import { IBM_Plex_Sans, Noto_Sans } from 'next/font/google'

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})
export const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

// Create a theme instance.
export const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1200,
      xl: 1536
    }
  },
  spacing: 8,
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
    inputBgOutfocused: {
      main: '#F6F7F8' // Custom color value
    },
    inputBorder: {
      main: '#cccecf' // Custom color value
    },
    inputText: {
      main: '#1c1c1c' // Custom color value
    },
    cardBorder: {
      main: '#ccc' // Custom color value
    },
    hintText: {
      main: '#7c7c7c' // Custom color value
    },
    white: {
      main: '#fff' // Custom color value
    },
    blue: {
      main: '#0079D3' // Custom color value
    },
    orange: {
      main: '#ff4500' // Custom color value
    },
    green: {
      main: '#44b700' // Custom color value
    }
  },
  typography: {
    fontFamily: ibmPlexSans.style.fontFamily,
    fontSize: 12.25,
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontWeightLight: 400
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // ...darkScrollbar(),
          backgroundColor: '#DAE0E6',
          fontSize: '1rem',
          fontWeight: 400
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span'
        }
      }
    }
  }
})
