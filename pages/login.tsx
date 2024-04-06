import AuthForm from "../components/cells/AuthForm";
import Layout from "../components/layout";

export default function LoginPage() {
  const title = "Login Page";
  return (
    <Layout pageTitle={title}>
      <AuthForm />
    </Layout>
  );
}
