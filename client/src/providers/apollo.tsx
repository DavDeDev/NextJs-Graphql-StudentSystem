"use client"

import { ApolloProvider } from "@apollo/client"
import {getClient} from "@/graphql/client";


export const ApolloProviders = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <ApolloProvider client={getClient()}>
    {children}
  </ApolloProvider>
)
