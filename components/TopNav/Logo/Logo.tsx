import { useDarkMode } from '@/components/Layouts/MuiProvider'
import { DARK_MODE } from '@/constants/enums'
import { Box } from '@/mui'
import logoMobileUrl from '@/public/logo-mobile.png'
import logoUrl from '@/public/logo.png'
import logoDarkUrl from '@/public/logo_dark.png'
import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  const { mode } = useDarkMode()
  return (
    <Link href="/" style={{ display: 'flex', padding: '0 0.5rem', marginRight: 'auto' }}>
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Image alt="logo" src={mode === DARK_MODE.light ? logoUrl : logoDarkUrl} sizes="385px" style={{ width: '6rem', height: 'auto' }} />
      </Box>
      <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Image alt="logo" src={logoMobileUrl} sizes="100px" style={{ width: '2rem', height: 'auto' }} />
      </Box>
    </Link>
  )
}

export default Logo
