// import { client } from '@/apollo-client'
// import { ADD_USER } from '@/graphql/mutations'
// import { GET_USER_BY_USERNAME } from '@/graphql/queries'
// import { hash } from 'bcrypt'
// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   try {
//     const { username, password } = await request.json()

//     // check if username has already existed
//     const {
//       data: { userByUsername: existedUser },
//       error
//     } = await client.query({
//       variables: { username },
//       query: GET_USER_BY_USERNAME
//     })
//     if (error) throw new Error(error.message)
//     if (existedUser) throw new Error('Username has existed')

//     // Hash the password and insert new user
//     const hashedPassword = await hash(password, 10)
//     await client.mutate({
//       variables: { username, password: hashedPassword },
//       mutation: ADD_USER
//     })
//   } catch (e) {
//     console.log({ e })
//   }

//   return NextResponse.json({ message: 'success' })
// }
