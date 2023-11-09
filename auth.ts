import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";
import { callbackify } from "util";

export const config = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      console.log(token);
      token.role = "user";
      return token;
    },
  }, //look into session callback if needed
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
