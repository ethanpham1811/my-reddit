import { signIn, signOut, useSession } from 'next-auth/react'

function TopNav() {
  const { data: session, status } = useSession()
  return <div>{!session ? <button onClick={() => signIn()}>login</button> : <button onClick={() => signOut()}>logout</button>}</div>
}

export default TopNav
