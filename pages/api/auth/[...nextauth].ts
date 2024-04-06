import { jwtDecode } from "jwt-decode";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        pseudonyme: { label: "Pseudonyme", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/authentication/sign-in`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pseudonyme: credentials.pseudonyme,
              password: credentials.password,
            }),
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user.data; // The user object should be returned correctly
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.error("user", JSON.stringify(user));
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;

        const decoded = jwtDecode<Record<string, any>>(user.accessToken);
        token.userPseudo = decoded.pseudo;
        token.userRole = decoded.role;
        token.userPermissions = decoded.permissions;
      }

      const now = Date.now();
      const shouldRefresh = token.accessTokenExpires
        ? now >= +token.accessTokenExpires
        : false;

      if (shouldRefresh) {
        const url = `${process.env.NEXTAUTH_URL}/authentication/refresh-tokens`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log("OK");
          token.accessToken = data.data?.accessToken;
          token.refreshToken = data.data?.refreshToken;
          token.accessTokenExpires = data.data?.accessTokenExpires;
        } else {
          token = null;
          signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login` });
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user.pseudo = token.userPseudo as string;
      session.user.role = token.userRole as string;
      session.user.permissions = token.userPermissions as string[];
      return session;
    },
  },
});
