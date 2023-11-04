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
    hintText: Palette['primary']
    cardBg: Palette['primary']
    tinyEditor: Palette['primary']
    white: Palette['primary']
    black: Palette['primary']
    blue: Palette['primary']
    lightblue: Palette['primary']
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
    hintText?: PaletteOptions['primary']
    cardBg?: PaletteOptions['primary']
    tinyEditor?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
    black?: PaletteOptions['primary']
    blue?: PaletteOptions['primary']
    lightblue?: PaletteOptions['primary']
    orange?: PaletteOptions['primary']
    green?: PaletteOptions['primary']
  }
  interface PaletteColor {
    white?: string
    black?: string
    blue?: string
    orange?: string
    green?: string
  }

  interface SimplePaletteColorOptions {
    white?: string
    black?: string
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

declare module 'next-auth' {
  interface User {
    id?: number
  }
  interface Session extends DefaultSession {
    user?: User
  }
}
