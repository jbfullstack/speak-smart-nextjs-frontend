import { useSession } from "next-auth/react";
import React from "react";

const VerifyTokens: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    // Assuming accessToken and refreshToken are stored in the session object
    // console.log("Access Token:", session.accessToken);
    // console.log("Refresh Token:", session.refreshToken);
  }

  return (
    <div>
      {session ? (
        <>
          <p>Access Token: {session.accessToken ? "Present" : "Not present"}</p>
          <p>
            Refresh Token: {session.refreshToken ? "Present" : "Not present"}
          </p>
        </>
      ) : (
        <p>No active session. Please log in.</p>
      )}
    </div>
  );
};

export default VerifyTokens;
