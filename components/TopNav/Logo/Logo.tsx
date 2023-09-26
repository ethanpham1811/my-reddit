import logoUrl from '@/public/logo.png'
import Image from 'next/image'

function Logo() {
  return <Image alt="logo" src={logoUrl} sizes="(min-width: 768px) 129px, 385px" style={{ width: '6rem', height: 'auto' }} />
}

export default Logo
