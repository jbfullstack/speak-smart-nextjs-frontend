import Layout from "../layout";

export default function MainPage({ title }) {
  return (
    <Layout pageTitle={title}>
      <h1 className="text-4xl">{title}</h1>
      {/* <div className="min-h-screen flex flex-col">
        <div className="m-auto">
          <h1 className="text-4xl">{title}</h1>
        </div>
      </div> */}
    </Layout>
  );
}
