import { TAppSession } from '@/src/constants/types'
import useUserByEmail from '@/src/hooks/useUserByEmail'
import { ApolloError } from '@apollo/client'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

type TUseUserDetailForSession = [appSession: TAppSession, loading: boolean, sessionUsername: string | undefined, error: ApolloError | undefined]

/**
 * Update session on authentication (login/logout)
 * - retrieve user email from Supabase auth
 * - fetch user data from db by this email
 * - append fetched data to session (userDetail)
 */
function useUserDetailForSession(): TUseUserDetailForSession {
  const supabase = useSupabaseClient()
  const [appSession, setAppSession] = useState<TAppSession>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userDetail, loading, error] = useUserByEmail(userEmail)

  // username from authentication providers (this is for default username on initial load)
  const sessionUsername: string | undefined = appSession?.user?.user_metadata?.username

  useEffect(() => {
    const sbAuth = supabase.auth.onAuthStateChange(async (_, session) => {
      session?.user?.email && setUserEmail(session.user.email)
      setAppSession(session ? { ...session, userDetail } : null)
    })
    return () => sbAuth?.data?.subscription.unsubscribe()
  }, [supabase, userDetail])

  return [appSession, loading, sessionUsername, error]
}

export default useUserDetailForSession
