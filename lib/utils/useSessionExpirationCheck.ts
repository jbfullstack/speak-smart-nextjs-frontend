import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

function decodeJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
}

const useSessionExpirationCheck = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session?.refreshToken) return;

    const checkExpiration = () => {
      const decoded = decodeJwt(session.refreshToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        // If the refresh token is expired, sign out the user
        console.log("Session expired. Signing out...");
        signOut();
      }
    };

    // Run immediately to check expiration on hook mount
    checkExpiration();

    // Optionally, set up an interval to check expiration periodically
    const intervalId = setInterval(checkExpiration, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [session, status]);

  // No return value needed unless you want to expose something specific from this hook
};

export default useSessionExpirationCheck;
