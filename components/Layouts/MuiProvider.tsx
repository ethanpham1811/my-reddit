import CssBaseline from '@mui/material/CssBaseline'
import { Theme, ThemeProvider } from '@mui/material/styles'
import cookie from 'js-cookie'
import { ReactNode, createContext, useMemo, useState } from 'react'
import { buildTheme } from '../../mui/theme'

export const ColorModeContext = createContext({ toggleDarkMode: () => {} })

function MuiProvider({ children }: { children: ReactNode }) {
  /* Dark mode setup */
  const [mode, setMode] = useState<'light' | 'dark'>((cookie.get('color-mode') as 'light' | 'dark') || 'light')
  const colorMode = useMemo(
    () => ({
      mode,
      toggleDarkMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))

        // store color mode in cookie
        cookie.set('color-mode', mode === 'light' ? 'dark' : 'light')
      }
    }),
    [mode]
  )

  /* Mui Theme setup  */
  const theme: Theme = buildTheme(mode)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default MuiProvider
