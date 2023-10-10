import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

const restrictedHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  session
    ? res.send({
        content: 'You are authorized!'
      })
    : res.send({
        error: 'You must be signed in to view this page.'
      })
}

export default restrictedHandler
