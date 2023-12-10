import '@mui/material/styles'

/* MUI style overriding */
declare module '@mui/material/styles' {
  interface Palette {
    gray?: SimplePaletteColorOptions
    bright?: SimplePaletteColorOptions
    premiumPricingBg?: SimplePaletteColorOptions
    white?: SimplePaletteColorOptions
    black?: SimplePaletteColorOptions
    blue?: SimplePaletteColorOptions
    orange?: SimplePaletteColorOptions
    green?: SimplePaletteColorOptions
    yellow?: SimplePaletteColorOptions
    purple?: SimplePaletteColorOptions
  }
  interface PaletteOptions {
    gray?: SimplePaletteColorOptions
    bright?: SimplePaletteColorOptions
    premiumPricingBg?: SimplePaletteColorOptions
    white?: SimplePaletteColorOptions
    black?: SimplePaletteColorOptions
    blue?: SimplePaletteColorOptions
    orange?: SimplePaletteColorOptions
    green?: SimplePaletteColorOptions
    yellow?: SimplePaletteColorOptions
    purple?: SimplePaletteColorOptions
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blue: true
    orange: true
  }
}
