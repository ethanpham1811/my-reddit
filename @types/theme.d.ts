// theme.d.ts
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    icon: {
      main: string
    }
    actionIcon: {
      main: string
    }
    hoverState: {
      main: string
    }
  }
  interface PaletteOptions {
    icon?: {
      main: string
    }
    actionIcon?: {
      main: string
    }
    hoverState?: {
      main: string
    }
  }
}
