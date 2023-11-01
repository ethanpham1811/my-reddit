import { ServerResponseData } from '@/constants/types'
import { generateUserName } from '@/src/utils'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function register(req: NextApiRequest, res: NextApiResponse<ServerResponseData>) {
  const supabase = createPagesServerClient({ req, res })

  try {
    if (req.method === 'POST') {
      const { email, password } = req.body
      const username = generateUserName()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            password
          }
        }
      })
      if (error) return res.status(400).json({ error: error.message })
      res.status(200).json({ message: 'Registration successfully' })
    } else {
      res.status(405).json({ message: 'Method Not Allowed!' })
    }
  } catch {
    res.status(500).json({ error: 'New user insertion failed' })
  }
}
