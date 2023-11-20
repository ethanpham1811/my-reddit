import { DARK_MODE } from '@/src/constants/enums'
import CssBaseline from '@mui/material/CssBaseline'
import { Theme, ThemeProvider } from '@mui/material/styles'
import cookie from 'js-cookie'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { buildTheme } from '../mui/theme'

export const DarkModeContext = createContext({ toggleDarkMode: () => {}, mode: DARK_MODE.light })

export function useDarkMode() {
  const { toggleDarkMode, mode } = useContext(DarkModeContext)
  return { toggleDarkMode, mode }
}

function MuiProvider({ children }: { children: ReactNode }) {
  /* Dark mode setup */
  const [mode, setMode] = useState<DARK_MODE>((cookie.get('color-mode') as DARK_MODE) || DARK_MODE.light)
  const colorMode = useMemo(
    () => ({
      mode,
      toggleDarkMode: () => {
        setMode((prevMode) => (prevMode === DARK_MODE.light ? DARK_MODE.dark : DARK_MODE.light))

        // store color mode in cookie
        cookie.set('color-mode', mode === DARK_MODE.light ? DARK_MODE.dark : DARK_MODE.light)
      }
    }),
    [mode]
  )

  /* Mui Theme setup  */
  const theme: Theme = buildTheme(mode)
  return (
    <DarkModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  )
}

export default MuiProvider
