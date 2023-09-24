import logoUrl from '@/public/logo.png'
import { css } from '@emotion/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { MenuDropDown, SearchBar } from '..'

const styles = css`
  display: flex;
  gap: 2rem;
  section:nth-child(1) {
    width: 5rem;
    position: relative;
  }
  section:nth-child(2) {
    svg {
      font-size: 1.5rem;
    }

    border: 2px solid black;
  }
`

function TopNav() {
  const { data: session, status } = useSession()

  return (
    <nav css={styles}>
      {!session ? <button onClick={() => signIn()}>login</button> : <button onClick={() => signOut()}>logout</button>}
      <section>
        <Image alt="logo" src={logoUrl} sizes="(min-width: 768px) 129px, 385px" style={{ width: '100%', height: 'auto' }} />
      </section>
      {/* dropdown */}
      <MenuDropDown session={session} />

      {/* search */}
      <SearchBar />
    </nav>
  )
}

export default TopNav
