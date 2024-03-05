"use client"

import { ApolloProvider } from "@apollo/client"
import client from "@/graphql/client";


export const ApolloProviders = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)
