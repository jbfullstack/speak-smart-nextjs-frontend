// components/AuthForm.tsx

import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import styles from "./styles/SignIn.module.css";

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={styles.container}>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthForm;
