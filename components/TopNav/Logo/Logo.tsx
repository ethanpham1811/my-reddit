import logoUrl from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/">
      <Image alt="logo" src={logoUrl} sizes="(min-width: 768px) 129px, 385px" style={{ width: '6rem', height: 'auto' }} />
    </Link>
  )
}

export default Logo
