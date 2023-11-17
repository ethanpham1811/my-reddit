import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { createFragmentRegistry } from '@apollo/client/cache'
import {
  COMMENT_FRAGMENT,
  POST_FRAGMENT,
  QUERIED_POST_FRAGMENT,
  SUBREDDIT_FRAGMENT,
  UPDATE_POST_FRAG,
  UPDATE_POST_WITH_VOTE_FRAG,
  UPDATE_USER_FRAG,
  USER_FRAGMENT
} from './graphql/fragments'
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_STEPZEN_HOST,
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
  }
})

export const client = new ApolloClient({
  // ssrMode: true,
  link: from([httpLink]),

  // important to provide the initialState to transfer data from server to client
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(
      POST_FRAGMENT,
      QUERIED_POST_FRAGMENT,
      USER_FRAGMENT,
      SUBREDDIT_FRAGMENT,
      COMMENT_FRAGMENT,
      UPDATE_USER_FRAG,
      UPDATE_POST_WITH_VOTE_FRAG,
      UPDATE_POST_FRAG
    )
  })
})

// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { setContext } from 'apollo-link-context'

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// export default function createApolloClient(initialState, ctx) {
//   // The `ctx` (NextPageContext) will only be present on the server.
//   // use it to extract auth headers (ctx.req) or similar.
//   return new ApolloClient({
//     ssrMode: Boolean(ctx),
//     link: httpLink,
//     cache: new InMemoryCache().restore(initialState)
//   })
// }

// const authLink = setContext((_, { headers }) => {
//   // Get the session cookie from your authentication provider
//   const sessionCookie = 'YOUR_SESSION_COOKIE'

//   return {
//     headers: {
//       ...headers,
//       cookie: sessionCookie ? `next-auth.session=${sessionCookie}` : ''
//     }
//   }
// })

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       toast.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
//     )
//   if (networkError) toast.error(`[Network error]: ${networkError}`)
// })

// const toastLink = {
//   onRequest: (operation) => {
//     toast.loading('Loading...')
//   },
//   onCompleted: () => {
//     toast.dismiss()
//   }
// }
