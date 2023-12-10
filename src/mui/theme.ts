import { DARK_MODE } from '@/src/constants/enums'
import { Theme, createTheme } from '@mui/material/styles'
import { Noto_Sans } from 'next/font/google'
import { buildPalette } from './palette'

export const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

// Create a theme instance.
export const buildTheme = (mode: DARK_MODE): Theme => {
  const palette = buildPalette(mode !== DARK_MODE.light)
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
            backgroundColor: mode === DARK_MODE.light ? '#DAE0E6' : '#1a1a1a',
            fontSize: '1rem',
            fontWeight: 400,
            '@media (max-width:1024px)': {
              fontSize: '16px !important'
            }
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
