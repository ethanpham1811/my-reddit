import logoUrl from '@/public/logo.png'
import { Box } from '@mui/material'
import Image from 'next/image'

function Logo() {
  return (
    <Box flex={1}>
      <Image alt="logo" src={logoUrl} sizes="(min-width: 768px) 129px, 385px" style={{ width: '5rem', height: 'auto' }} />
    </Box>
  )
}

export default Logo
