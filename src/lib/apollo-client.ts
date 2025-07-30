// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql', // Point to your NestJS GraphQL endpoint
    credentials: 'include', // if cookies/sessions required
  }),
  cache: new InMemoryCache(),
});
