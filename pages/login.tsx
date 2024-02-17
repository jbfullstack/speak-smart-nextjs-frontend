import AuthForm from "../components/cells/AuthForm";
import Layout from "../components/layout";

export default function LoginPage() {
  const title = "Login Page";
  return (
    <Layout pageTitle={title}>
      <h1 className="text-4xl font-bold ml-4 p-2">{title}</h1>
      <AuthForm />
    </Layout>
  );
}
