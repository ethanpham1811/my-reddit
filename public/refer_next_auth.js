import NextAuth from 'next-auth'

// import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  session: {
    strategy: 'jwt'
    // jwt: true,
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60 // 24 hours
  },
  // providers: [
  //   // GoogleProvider({
  //   //   clientId: process.env.REDDIT_CLIENT_ID,
  //   //   clientSecret: process.env.REDDIT_CLIENT_SECRET
  //   // })
  //   RedditProvider({
  //     clientId: process.env.REDDIT_CLIENT_ID,
  //     clientSecret: process.env.REDDIT_CLIENT_SECRET
  //   }),
  //   Credentials({
  //     // The name to display on the sign-in form (e.g., "Sign in with...")
  //     name: 'Credentials',
  //     credentials: {
  //       username: { label: 'Username', type: 'text' },
  //       password: { label: 'Password', type: 'password' }
  //     },
  //     authorize: async (credentials) => {
  //       const { username, password } = credentials

  //       // check if username has already existed
  //       const existedUser = await findUser(username, password)
  //       console.log(existedUser)

  //       if (!existedUser || !existedUser.password) throw new Error('User not found')

  //       // Validate the password (you should hash and compare)
  //       const passCheckRes = await bcrypt.compare(password, existedUser.password)
  //       if (!passCheckRes) throw new Error('Invalid password')
  //       console.log(existedUser)
  //       return existedUser
  //     }
  //   })
  // ],
  callbacks: {
    //   async signIn({ user, account, profile }) {
    //     console.log(user, account, profile)
    //     if (user) {
    //       /* ------------signin with credentials --------------*/
    //       if (account.provider === 'credentials') return Promise.resolve(true)

    //       /* ----------signin with Reddit account ------------*/
    // if (account.provider === 'reddit') {
    //   const { email, name: username } = user
    //   const coverUrl = profile?.subreddit?.banner_img

    //   // check if username has already existed
    //   const existedUser = await findUser()
    //   // Return existed user
    //   if (existedUser) return true

    //   // If username does not exist, insert the new user
    //   const { data: newUser } = await client.mutate({
    //     variables: {
    //       email,
    //       username,
    //       coverUrl
    //     },
    //     mutation: ADD_USER
    //   })

    //   return newUser?.insertUser ? true : false // reject if db insertion fails
    // }
    //     }
    //     // reject if no user found
    //     return Promise.resolve(false)
    //   },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async jwt({ token, account, user, session, trigger }) {
      if (trigger === 'update' && session?.name) token.name = session.name

      if (account) token.accessToken = account.access_token

      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.username || user.name
        }
      }
      return token
    },
    async session({ token, user, session }) {
      session.accessToken = token.accessToken
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            accessToken: token.accessToken
          }
        }
      }
      return session
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
  }
}

export default NextAuth(authOptions)
