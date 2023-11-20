/* temporarily unused */

import { client } from '@/apollo-client'
import { ServerResponseData } from '@/src/constants/types'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function login(req: NextApiRequest, res: NextApiResponse<ServerResponseData>) {
  const supabase = createPagesServerClient({ req, res })

  try {
    if (req.method === 'POST') {
      const { email, password } = req.body
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) return res.status(400).json({ error: error.message })

      // reset cache upon login
      client.resetStore()

      res.status(200).json({ message: 'Login successfully' })
    } else {
      res.status(405).json({ message: 'Method Not Allowed!' })
    }
  } catch {
    res.status(500).json({ error: 'Login failed' })
  }
}
