import NextAuth, { NextAuthOptions, User, Account, Profile } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { FetchResult } from "@apollo/client";
import { GOOGLE_LOGIN_MUTATION } from "@/graphql/mutations"; // mutation that returns JWT token from your backend
import { ExtendedJWT, ExtendedSession } from "@/interface/auth";
import { createApolloClient } from "@/lib/apollo-server";
const applloServer = createApolloClient()
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    // Called after provider authentication, decide if sign-in allowed
    async signIn({ user, account }) {
      if (
        (account?.provider === "google" || account?.provider === "github") &&
        user.email
      ) {
        try {
          
          const result: FetchResult<{
            googleLogin: {
              token: string;
            };
          }> = await applloServer.mutate({
            mutation: GOOGLE_LOGIN_MUTATION,
            variables: { email: user.email },
            fetchPolicy: "no-cache",
          });

          const token = result.data?.googleLogin?.token;
          console.log(token, "=-=-=-=");

          if (!token) {
            console.log(
              `User ${user.email} not registered in backend,${token}`
            );
            return `/?error=UserNotFound`;
          }
          // User exists, allow sign
          return true;
        } catch (error: any) {
          console.error("Error during signIn:", {
            message: error.message,
            networkError:
              error.networkError?.result?.errors || error.networkError,
            graphQLErrors: error.graphQLErrors,
            clientErrors: error.clientErrors,
          });
          return `/?error=BackendError`;
        }
      }

      // For other provders or missing email, allow by default
      return true;
    },

    // Called to create/update JWT token; attach backend user info here
    async jwt(params: {
      token: JWT;
      user?: User;
      account: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: any;
    }): Promise<JWT> {
      // Important: Return Promise<JWT>, not Promise<ExtendedJWT>
      const { token, user, account } = params;
      const extendedToken = token as ExtendedJWT;

      if (account && user && user.email) {
        try {
          const result: FetchResult<{ token: string }> =
            await applloServer.mutate({
              mutation: GOOGLE_LOGIN_MUTATION,
              variables: { email: user.email },
              fetchPolicy: "no-cache",
            });

          if (result.data?.token) {
            extendedToken.backendToken = result.data.token;
            extendedToken.provider = account.provider;
          }
          if (extendedToken.backendToken) {
            const decoded: any = jwtDecode(extendedToken.backendToken);
            extendedToken.backendUserId = decoded.id;
            extendedToken.role = decoded.role;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      // Cast to JWT for return, prevents TS error
      return extendedToken as JWT;
    },

    // Called whenever session is checked, attach token props to session
    async session({ session, token }) {
      const extendedSession = session as ExtendedSession;
      const extendedToken = token as ExtendedJWT;

      if (extendedSession.user && extendedToken.backendUserId) {
        extendedSession.user.id = extendedToken.backendUserId;
        extendedSession.user.role = extendedToken.role;
        extendedSession.provider = extendedToken.provider;
      }

      return extendedSession;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
