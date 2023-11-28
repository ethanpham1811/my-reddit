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
    inlineEditBg: Palette['primary']
    commentBox: Palette['primary']
    premiumPricingBg: Palette['primary']
    white: Palette['primary']
    black: Palette['primary']
    blue: Palette['primary']
    lightblue: Palette['primary']
    orange: Palette['primary']
    green: Palette['primary']
    yellow: Palette['primary']
    purple: Palette['primary']
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
    inlineEditBg?: PaletteOptions['primary']
    commentBox?: PaletteOptions['primary']
    premiumPricingBg?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
    black?: PaletteOptions['primary']
    blue?: PaletteOptions['primary']
    lightblue?: PaletteOptions['primary']
    orange?: PaletteOptions['primary']
    green?: PaletteOptions['primary']
    yellow?: PaletteOptions['primary']
    purple?: PaletteOptions['primary']
  }
  interface PaletteColor {
    white?: string
    black?: string
    blue?: string
    orange?: string
    green?: string
    yellow?: string
    purple?: string
  }

  interface SimplePaletteColorOptions {
    white?: string
    black?: string
    blue?: string
    orange?: string
    green?: string
    yellow?: string
    purple?: string
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true
    blue: true
    orange: true
    green: true
    yellow: true
    purple: true
  }
}
