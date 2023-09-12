import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://outreau.stepzen.net/api/my-reddit/__graphql',
  headers: {
    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
  },
  cache: new InMemoryCache()
})
