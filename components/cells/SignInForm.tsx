import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Spacer,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CustomErrorAlert from "../atoms/CustomErrorDisplayer";
import styles from "./styles/SignIn.module.css";

const avatar = "/static/bot-veal-no-bg.png";

const SignInForm: React.FC = () => {
  const [pseudonyme, setPseudonyme] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const placement = "outside";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from automatically redirecting
      pseudonyme,
      password,
    });

    if (result?.error) {
      // Handle error based on your backend response
      setError("Wrong credentials"); // Simplified for example purposes
    } else {
      // Redirect to the home page on successful sign-in
      console.log("sign-in result", JSON.stringify(result));
      // useSessionExpirationCheck();
      router.push("/");
    }
  };

  const clearError = () => setError(null);

  return (
    <div>
      {error && (
        <CustomErrorAlert
          severity="danger"
          error={error}
          onClose={clearError}
        />
      )}

      <div className={styles.cardsContainer}>
        <form onSubmit={handleSignIn}>
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="avatar"
                height={40}
                radius="sm"
                src={avatar}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md"> </p>
                <p className="text-small text-default-500">Login</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  isRequired
                  key={placement}
                  label="Pseudonyme"
                  labelPlacement={placement}
                  value={pseudonyme}
                  onChange={(e) => setPseudonyme(e.target.value)}
                />
              </div>

              <Spacer y={1} />
              <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  isRequired
                  key={placement}
                  label="Password"
                  type="password"
                  labelPlacement={placement}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className={styles.signInButtonContainer}>
                <Button type="submit"> Sign In </Button>
              </div>
            </CardFooter>
          </Card>
          {/* 
          {error && <div style={{ color: "red" }}>{error}</div>} */}
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
