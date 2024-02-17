// utils/sessionTokens.ts
import { getSession } from "next-auth/react";

export async function getTokens() {
  const session = await getSession();
  return {
    accessToken: session?.accessToken as string | undefined,
    refreshToken: session?.refreshToken as string | undefined,
  };
}
