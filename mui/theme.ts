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

const lightPalette = {
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
  cardBg: {
    main: '#fff' // Custom color value
  },
  tinyEditor: {
    main: '#fff' // Custom color value
  },
  inlineEditBg: {
    main: '#DAE0E6' // Custom color value
  },
  commentBox: {
    main: '#e9f5fd' // Custom color value
  },
  premiumPricingBg: {
    main: '#e9f5fd' // Custom color value
  },
  white: {
    main: '#fff' // Custom color value
  },
  black: {
    main: '#000' // Custom color value
  },
  blue: {
    main: '#0079D3' // Custom color value
  },
  lightblue: {
    main: '#e9f5fd' // Custom color value
  },
  orange: {
    main: '#ff4500' // Custom color value
  },
  green: {
    main: '#44b700' // Custom color value
  },
  yellow: {
    main: '#ffd623' // Custom color value
  },
  purple: {
    main: '#fa00e2' // Custom color value
  }
}

const darkPalette = {
  primary: {
    main: '#1a1a1a'
  },
  secondary: {
    main: '#1a1a1a'
  },
  error: {
    main: red.A400
  },
  icon: {
    main: '#fff' // Custom color value
  },
  actionIcon: {
    main: '#878A8C' // Custom color value
  },
  inputBgOutfocused: {
    main: '#222' // Custom color value
  },
  inputBorder: {
    main: '#333' // Custom color value
  },
  inputText: {
    main: '#fff' // Custom color value
  },
  cardBorder: {
    main: '#444' // Custom color value
  },
  hintText: {
    main: '#7c7c7c' // Custom color value
  },
  cardBg: {
    main: '#121212' // Custom color value
  },
  tinyEditor: {
    main: '#d0d0d0' // Custom color value
  },
  inlineEditBg: {
    main: '#7c7c7c' // Custom color value
  },
  commentBox: {
    main: '#494949' // Custom color value
  },
  premiumPricingBg: {
    main: '#ff4500' // Custom color value
  },
  white: {
    main: '#000' // Custom color value
  },
  black: {
    main: '#fff' // Custom color value
  },
  blue: {
    main: '#0079D3' // Custom color value
  },
  lightblue: {
    main: '#d0d0d0' // Custom color value
  },
  orange: {
    main: '#ff4500' // Custom color value
  },
  green: {
    main: '#44b700' // Custom color value
  },
  yellow: {
    main: '#ffd623' // Custom color value
  },
  purple: {
    main: '#fa00e2' // Custom color value
  }
}

// Create a theme instance.
export const buildTheme = (mode: 'light' | 'dark'): Theme => {
  const palette = mode === 'light' ? lightPalette : darkPalette
  return createTheme({
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
      mode,
      ...palette
    },
    typography: {
      fontFamily: notoSans.style.fontFamily,
      fontSize: 12.25,
      fontWeightBold: 700,
      fontWeightMedium: 600,
      fontWeightRegular: 500,
      fontWeightLight: 400
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // Add permanent scrollbar so it won't alter html width on hidding/showing
          html: {
            overflowY: 'scroll',
            scrollBehavior: 'smooth'
          },
          body: {
            backgroundColor: mode === 'light' ? '#DAE0E6' : '#1a1a1a',
            fontSize: '1rem',
            fontWeight: 400
          },
          //TinyMCE elements overridings (comment box)
          '.parsed-html p': {
            marginTop: 0,
            marginBottom: 0
          },
          'input[type=file], input[type=file]::-webkit-file-upload-button': {
            /* chromes and blink button */
            cursor: 'pointer'
          }
        }
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '1rem !important',
            paddingRight: '1rem !important'
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
}
