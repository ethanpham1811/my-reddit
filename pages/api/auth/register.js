import { client } from '@/apollo-client'
import { ADD_USER } from '@/graphql/mutations'
import { findUser } from '@/services'
import { hash } from 'bcrypt'

export default async function register(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    // check if username has already existed
    const existedUser = await findUser(username, password)
    if (existedUser) throw new Error('Username has existed')

    /* If username does not exist, insert the new user */
    const hashedPassword = await hash(password, 10)
    const {
      data: { insertUser: newUser },
      error: newUserError
    } = await client.mutate({
      variables: { username, password: hashedPassword },
      mutation: ADD_USER
    })

    newUser && res.status(200).json({ status: 'User registered successfully', user: newUser })
    newUserError && res.status(500).json({ status: 'New user insertion failed' })
  } else {
    res.status(405).json({ status: 'Method Not Allowed' })
  }
}