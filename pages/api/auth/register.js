import { client } from '@/apollo-client'
import { ADD_USER } from '@/graphql/mutations'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import { hash } from 'bcrypt'

export default async function register(req, res) {
  if (req.method === 'POST') {
    const { username, password } = JSON.parse(req.body)
    try {
      // check if username has already existed
      const {
        data: { userByUsername: existedUser },
        error
      } = await client.query({
        variables: { username },
        query: GET_USER_BY_USERNAME
      })
      if (error) throw new Error(error.message)
      if (existedUser) throw new Error('Username has existed')

      /* If username does not exist, insert the new user */
      const hashedPassword = await hash(password, 10)
      await client.mutate({
        variables: { username, password: hashedPassword },
        mutation: ADD_USER
      })
    } catch (error) {
      throw new Error(error.message)
    }
  } else {
    res.status(405).json({ status: 'Method Not Allowed' })
  }
}
