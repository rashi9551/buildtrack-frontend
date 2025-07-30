"use client"

import { ReactNode } from "react"
import { ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import { apolloClient } from "@/lib/apollo-client"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
   </SessionProvider>
  )
}
