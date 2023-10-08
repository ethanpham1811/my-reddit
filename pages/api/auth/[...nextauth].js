import { client } from '@/apollo-client'
import { ADD_USER } from '@/graphql/mutations'
import { GET_USER_BY_USERNAME } from '@/graphql/queries'
import NextAuth from 'next-auth'
import RedditProvider from 'next-auth/providers/reddit'
// import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET
    })
    // GoogleProvider({
    //   clientId: process.env.REDDIT_CLIENT_ID,
    //   clientSecret: process.env.REDDIT_CLIENT_SECRET
    // })
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (user) {
        const {
          user: { email, name: username },
          profile: {
            subreddit: { banner_img: coverUrl }
          }
        } = user

        // check if username has already existed
        const { data: existedUser } = await client.query({
          variables: { username },
          query: GET_USER_BY_USERNAME
        })

        // Return existed user
        if (existedUser?.userByUsername) return true

        // If username does not exist, insert the new user
        const { data: newUser } = await client.mutate({
          variables: {
            email,
            username,
            coverUrl
          },
          mutation: ADD_USER
        })

        return newUser?.insertUser ? true : false
      }
      // return false if db insertion fails
      return Promise.resolve(false)
    }
  }
}

export default NextAuth(authOptions)
