// theme.d.ts
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    icon: Palette['primary']
    actionIcon: Palette['primary']
    inputBgOutfocused: Palette['primary']
    inputBorder: Palette['primary']
    inputText: Palette['primary']
    cardBorder: Palette['primary']
    white: Palette['primary']
    blue: Palette['primary']
    orange: Palette['primary']
    green: Palette['primary']
  }
  interface PaletteOptions {
    icon?: PaletteOptions['primary']
    actionIcon?: PaletteOptions['primary']
    inputBgOutfocused?: PaletteOptions['primary']
    inputBorder?: PaletteOptions['primary']
    inputText?: PaletteOptions['primary']
    cardBorder?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
    blue?: PaletteOptions['primary']
    orange?: PaletteOptions['primary']
    green?: PaletteOptions['primary']
  }
  interface PaletteColor {
    white?: string
    blue?: string
    orange?: string
    green?: string
  }

  interface SimplePaletteColorOptions {
    white?: string
    blue?: string
    orange?: string
    green?: string
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true
    blue: true
    orange: true
    green: true
  }
}
