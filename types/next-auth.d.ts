import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      pseudo?: string;
      role?: string;
      permissions?: string[];
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
