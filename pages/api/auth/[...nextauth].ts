// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      console.error("\n  START-------------");
      if (user) {
        console.error("user", JSON.stringify(user));
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        // console.error("refreshToken", user.refreshToken);
      }

      const now = Date.now();
      const shouldRefresh = token.accessTokenExpires
        ? now >= +token.accessTokenExpires
        : false;

      // console.error("token", JSON.stringify(token));
      // console.error(now, "now");
      // console.error(token.accessTokenExpires, "token.accessTokenExpires");
      // console.error("shouldRefresh", shouldRefresh);

      if (shouldRefresh) {
        // Call your backend's refresh endpoint
        // This is a simplified example; adapt as needed for your backend API
        const url = `${process.env.NEXTAUTH_URL}/authentication/refresh-tokens`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Optionally, include other headers required by your backend
          },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        });
        const data = await response.json();
        // console.log("Token refreshed? ", JSON.stringify(data));
        if (response.ok) {
          console.log("OK");
          token.accessToken = data.data?.accessToken;
          token.refreshToken = data.data?.refreshToken;
          token.accessTokenExpires = data.data?.accessTokenExpires;

          // console.error(" new token", JSON.stringify(token), "\n\n");
        } else {
          // Handle failure: throw an error, log it, etc.
          console.error("Failed to refresh token", data);
          console.error("with ", token.refreshToken, "\n\n");
          // Optionally, sign out the user if token refresh failed critically
          // throw new Error("RefreshTokenError")
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      console.error(" Update session ", JSON.stringify(token), "\n\n");
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      console.error(" END -------------", "\n");
      return session;
    },
  },
  // Additional configuration...
});
