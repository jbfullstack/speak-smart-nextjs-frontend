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
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CustomErrorAlert from "../atoms/CustomErrorDisplayer";
import styles from "./styles/SignIn.module.css";

const avatar = "/static/bot-veal-no-bg.png"; // Ensure this path is correct
const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pseudonyme, setPseudonyme] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/signup", {
        email,
        pseudonyme,
        password,
      });
      // If sign-up is successful, automatically log the user in
      const result = await signIn("credentials", {
        redirect: false,
        pseudonyme,
        password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        // useSessionExpirationCheck();
        router.push("/"); // Redirect to home page on successful sign-in
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
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
        <form onSubmit={handleSignUp}>
          <Card>
            <CardHeader>
              <Image
                alt="avatar"
                height={40}
                radius="sm"
                src={avatar}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md"> </p>
                <p className="text-small text-default-500">Register</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Input
                isRequired
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                isRequired
                placeholder="Pseudonyme"
                value={pseudonyme}
                onChange={(e) => setPseudonyme(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                isRequired
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <Button type="submit">Sign up</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
