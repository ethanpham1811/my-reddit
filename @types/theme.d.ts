// theme.d.ts
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    icon: Palette['primary']
    actionIcon: Palette['primary']
    hoverState: Palette['primary']
    inputBgOutfocused: Palette['primary']
    inputBorder: Palette['primary']
    inputText: Palette['primary']
    cardBorder: Palette['primary']
  }
  interface PaletteOptions {
    icon?: PaletteOptions['primary']
    actionIcon?: PaletteOptions['primary']
    hoverState?: PaletteOptions['primary']
    inputBgOutfocused?: PaletteOptions['primary']
    inputBorder?: PaletteOptions['primary']
    inputText?: PaletteOptions['primary']
    cardBorder?: PaletteOptions['primary']
  }
}
