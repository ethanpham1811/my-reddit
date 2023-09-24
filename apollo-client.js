import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'

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

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_STEPZEN_HOST,
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
  }
})

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

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink])
})
