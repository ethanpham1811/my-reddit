import logoMobileUrl from '@/public/logo-mobile.png'
import logoUrl from '@/public/logo.png'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/" style={{ display: 'flex', padding: '0 0.5rem' }}>
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Image alt="logo" src={logoUrl} sizes="385px" style={{ width: '6rem', height: 'auto' }} />
      </Box>
      <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Image alt="logo" src={logoMobileUrl} sizes="100px" style={{ width: '2rem', height: 'auto' }} />
      </Box>
    </Link>
  )
}

export default Logo
